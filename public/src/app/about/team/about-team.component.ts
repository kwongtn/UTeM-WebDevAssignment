import { Component, OnInit } from '@angular/core';

interface Links {
  name: string;
  link: string;
}

interface Profile {
  name: string;
  role: string;
  profilePict: string | null;
  description: string;
  links?: Array<Links>;
}

@Component({
  selector: 'app-about-team',
  templateUrl: './about-team.component.html',
  styleUrls: ['./about-team.component.css'],
})
export class AboutTeamComponent implements OnInit {
  profiles: Array<Profile> = [
    {
      name: 'Kwong Tung Nan',
      role: 'Lead Developer',
      profilePict:
        'https://media-exp1.licdn.com/dms/image/C5103AQHH8z3LUfFBLw/profile-displayphoto-shrink_200_200/0/1559217292341?e=1614816000&v=beta&t=trFMxoKyIu20Re9J3IlB9FZm-3yFspzNgmxwcH_98RU',
      description: `A passionate individual that is constantly exploring and being amazed by new technologies. Always open to learn them to create a better world, I won't mind if credit is not given to me, as long as the end goal is achieved.
      I devote my free time on understanding and joining talks, forums, meetups and exhibitions on improving my skillsets, discuss on ways to improve connectivity in Klang Valley with regards to the Sustainable Development Goals, and to advocate for Open Data.
      Also a paranoid for good UI/UX, future-proof implementations and massively scalable systems.`,
      links: [
        { name: 'LinkedIn', link: 'https://www.linkedin.com/in/kwongtn/' },
        { name: 'GitHub', link: 'https://github.com/kwongtn' },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
