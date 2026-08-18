import {Component} from '@angular/core';


@Component({
    selector: 'app-skills-section',
    imports: [],
    templateUrl: './skills-section.component.html',
    styleUrl: './skills-section.component.scss'
})
export class SkillsSectionComponent {
    skillGroups = [
        {
            title: 'Backend',
            skills: [
                {name: 'Java', icon: 'fab fa-java'},
                {name: 'Spring Framework', icon: 'fas fa-leaf'},
                {name: 'Spring Cloud', icon: 'fas fa-cloud'},
                {name: 'Python', icon: 'fab fa-python'},
                {name: 'JavaFX', icon: 'fas fa-desktop'},
            ]
        },
        {
            title: 'Frontend',
            skills: [
                {name: 'Angular', icon: 'fab fa-angular'},
                {name: 'React', icon: 'fab fa-react'},
                {name: 'Next.js', icon: 'fas fa-layer-group'},
                {name: 'TypeScript', icon: 'fas fa-code'},
                {name: 'JavaScript', icon: 'fab fa-js'},
                {name: 'HTML5', icon: 'fab fa-html5'},
                {name: 'CSS3', icon: 'fab fa-css3-alt'},
            ]
        },
        {
            title: 'Databases',
            skills: [
                {name: 'SQL', icon: 'fas fa-database'},
                {name: 'Oracle DB', icon: 'fas fa-database'},
                {name: 'MongoDB', icon: 'fas fa-leaf'},
            ]
        },
        {
            title: 'Cloud & DevOps',
            skills: [
                {name: 'AWS', icon: 'fab fa-aws'},
                {name: 'OCI', icon: 'fas fa-cloud'},
                {name: 'Docker', icon: 'fab fa-docker'},
                {name: 'Git', icon: 'fab fa-git-alt'},
            ]
        },
    ];
}
