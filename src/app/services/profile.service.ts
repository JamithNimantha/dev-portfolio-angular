import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'yaml';
import { Observable, map, shareReplay } from 'rxjs';

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface Profile {
    name: string;
    title: string;
    website: string;
    blog: string;
    socialLinks: SocialLink[];
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private readonly profileUrl = 'assets/profile.yml';
    private readonly profile$!: Observable<Profile>;

    constructor(private http: HttpClient) {
        this.profile$ = this.http.get(this.profileUrl, { responseType: 'text' }).pipe(
            map(raw => parse(raw) as Profile),
            shareReplay(1)
        );
    }

    getProfile(): Observable<Profile> {
        return this.profile$;
    }

    getSocialLinks(): Observable<SocialLink[]> {
        return this.profile$.pipe(map(profile => profile.socialLinks));
    }
}
