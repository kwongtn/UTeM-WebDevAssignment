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
      description: `A passionate individual that is constantly exploring and being amazed by new technologies. Always open to learn them to create a better world, I won't mind if credit is not given to me, as long as the end goal is achieved. \nI devote my free time on understanding and joining talks, forums, meetups and exhibitions on improving my skillsets, discuss on ways to improve connectivity in Klang Valley with regards to the Sustainable Development Goals, and to advocate for Open Data.\nAlso a paranoid for good UI/UX, future-proof implementations and massively scalable systems.`,
      links: [
        { name: 'LinkedIn', link: 'https://www.linkedin.com/in/kwongtn/' },
        { name: 'GitHub', link: 'https://github.com/kwongtn' },
        { name: 'Biography', link: 'assets/kwongtn/B031810219.html' },
      ],
    },
    {
      name: 'Shamhinidevi Jayabalan',
      role: 'Backend API Developer',
      profilePict: 'assets/sham.jpg',
      description: `I'm Shamhinidevi an undergraduate student. I am currently pursuing my third year Bachelor of Degree in Computer Science specializes in Artificial Intelligence. In 2018, I graduated from Politeknik Balik Pulau (PBU). \nI am a person who is positive about every aspect of life. I love to explore what's around me, everything interests me very much. Life is all about growth. I am still learning, and sometimes it is wonderful and other times it is messy, but I keep moving. `,
      links: [
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/shamhinidevi-jayabalan-ba5a77159',
        },
        { name: 'GitHub', link: 'https://github.com/Sham0106' },
        { name: 'Biography', link: 'assets/shamhini/Biography.html' },
      ],
    },
    {
      name: 'Ainin Sofiya',
      role: 'Backend API Developer',
      profilePict: 'assets/AinSofiya.jpg',
      description: `Hi there! I' am Ainin. You can call me Nia. I am positive thinker. I am currently studied at UTeM Malacca and furthering my studies in Artificial Intelligence courses. Backthen, I am graduated in Higher National Diploma(HND) in Computing (System Development). My major programming language is C#. But I am ready to learn new programming languages. My Moto life is "If we ease others, others will ease us in the future, with God Permission". So lets keep learning, because life never stop teaching.   `,
      links: [
        { name: 'LinkedIn', link: 'https://www.linkedin.com/in/AinSofiya' },
        { name: 'GitHub', link: 'https://github.com/AinSofiya' },
        { name: 'Biography', link: 'assets/ainin/biograpAHome.html' },
      ],
    },
    {
      name: 'Lim Zi Feng',
      role: '',
      profilePict: 'assets/Picture.jpg',
      description: `Hi there! I' am Zi Feng. You can call me Feng. Health is the most important thing in part Of our life. Our health is at the center of our life. Every part of our life relies on you having good health. I spend some time for exercise every day. Also, I would spend some time for learning web development because it need a lot of skill and creative thinking. `,
      links: [
        { name: 'LinkedIn', link: 'https://www.linkedin.com/' },
        { name: 'GitHub', link: 'https://github.com/FengLim' },
        { name: 'Biography', link: 'assets/zifeng/biography.html' },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
