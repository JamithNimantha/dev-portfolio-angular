import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string; // human-friendly date
    isoDate?: string; // ISO date for sorting
    readTime: string;
    category: string;
    link: string;
    source?: 'external' | 'local';
}

@Injectable({ providedIn: 'root' })
export class BlogPostService {
    private readonly feedUrl = 'https://example.com/feed.xml';
    private readonly CATEGORY_FILTER = 'tutorial'; // only show posts in this category
    private readonly DEFAULT_IMAGE = 'assets/images/blog/default.svg';
    private readonly EXCERPT_MAX = 100; // limit excerpt to 100 characters

    private readonly isBrowser: boolean;

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    getRecentPosts(): Observable<BlogPost[]> {
        // RSS/XML parsing relies on the browser's DOMParser, which isn't
        // available during server-side prerendering; hydrate client-side instead.
        if (!this.isBrowser) {
            return of([]);
        }
        return this.http.get(this.feedUrl, { responseType: 'text' }).pipe(
            map((xml: string) => {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(xml, 'application/xml');
                    const items = Array.from(doc.getElementsByTagName('item')) as Element[];
                    const posts = items
                        .filter((item: Element) => this.hasCategory(item, this.CATEGORY_FILTER))
                        .map((item: Element) => this.mapRssItemToBlogPost(item));
                    posts.sort((a, b) => {
                        const aTime = a.isoDate ? new Date(a.isoDate).getTime() : Date.parse(a.date);
                        const bTime = b.isoDate ? new Date(b.isoDate).getTime() : Date.parse(b.date);
                        return bTime - aTime;
                    });
                    return posts.slice(0, 6);
                } catch (e) {
                    console.error('Failed to parse RSS feed', e);
                    return [] as BlogPost[];
                }
            })
        );
    }

    private hasCategory(item: Element, category: string): boolean {
        const categoryEls = Array.from(item.getElementsByTagName('category'));
        return categoryEls.some(el => (el.textContent || '').trim().toLowerCase() === category);
    }

    private mapRssItemToBlogPost(item: Element): BlogPost {
        const title = this.getFirstTagText(item, ['title']) || 'Untitled';
        const link = this.getFirstTagText(item, ['link']) || '#';
        const pubDateText = this.getFirstTagText(item, ['pubDate', 'published', 'updated']) || new Date().toUTCString();
        const iso = (() => {
            const d = new Date(pubDateText);
            return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
        })();

        const content = this.getFirstTagText(item, ['content:encoded', 'encoded', 'description']) || '';

        const excerptRaw = this.stripHtml(content);
        const excerpt = excerptRaw.length > this.EXCERPT_MAX ? excerptRaw.slice(0, this.EXCERPT_MAX) : excerptRaw;
        const wordCount = this.estimateWordCount(content || excerpt);
        const readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`;

        // Prefer dedicated image tags/fields, then look inside content
        const image = this.extractImageFromElement(item) || this.extractImageFromContent(content) || this.DEFAULT_IMAGE;

        const category = this.capitalize(this.CATEGORY_FILTER);

        const id = Date.parse(iso);

        return {
            id: isNaN(id) ? Math.floor(Math.random() * 1000000) : id,
            title,
            excerpt,
            image,
            date: new Date(iso).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
            isoDate: iso,
            readTime,
            category,
            link,
            source: 'external'
        };
    }

    private capitalize(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    private extractImageFromElement(parent: Element): string | null {
        if (!parent) return null;
        // check for explicit image_url tag used in some feeds
        const imageUrl = this.getFirstTagText(parent, ['image_url', 'image']);
        if (imageUrl && imageUrl.trim()) return imageUrl.trim();

        // media:content (common in some feeds) may have a url attribute
        const mediaContents = parent.getElementsByTagName('media:content');
        if (mediaContents && mediaContents.length > 0) {
            const url = mediaContents[0].getAttribute && mediaContents[0].getAttribute('url');
            if (url) return url;
        }

        // enclosure with url attribute
        const enclosures = parent.getElementsByTagName('enclosure');
        if (enclosures && enclosures.length > 0) {
            const url = enclosures[0].getAttribute && enclosures[0].getAttribute('url');
            if (url) return url;
        }

        // <img ... /> directly under element
        const imgEls = parent.getElementsByTagName('img');
        if (imgEls && imgEls.length > 0) {
            const src = imgEls[0].getAttribute && imgEls[0].getAttribute('src');
            if (src) return src;
            if (imgEls[0].textContent && imgEls[0].textContent.trim()) return imgEls[0].textContent.trim();
        }

        return null;
    }

    private extractImageFromContent(content: string): string | null {
        if (!content) return null;
        // look for <img src="..."> in content string
        const imgRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"]/i;
        const m = content.match(imgRegex);
        if (m && m[1]) return m[1];
        // try looking for <figure><img src="..."> or markdown-style ![alt](url)
        const mdRegex = /!\[[^]]*\]\((https?:[^)\s]+)\)/i;
        const mm = content.match(mdRegex);
        if (mm && mm[1]) return mm[1];
        return null;
    }

    private getFirstTagText(parent: Element, tagNames: string[]): string | null {
        for (const tag of tagNames) {
            const nodes = parent.getElementsByTagName(tag);
            if (nodes && nodes.length > 0) {
                return nodes[0].textContent || null;
            }
        }
        // try fallback by localName (for namespaced tags like content:encoded)
        for (const tag of tagNames) {
            const nodes = Array.from(parent.childNodes).filter(n => (n as Element).localName === tag.split(':').pop());
            if (nodes.length > 0) return (nodes[0].textContent) || null;
        }
        return null;
    }

    private stripHtml(html: string): string {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    private estimateWordCount(html: string): number {
        const stripped = this.stripHtml(html).trim();
        if (!stripped) return 0;
        return stripped.split(/\s+/).length;
    }
}
