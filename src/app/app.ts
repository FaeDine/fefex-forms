import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  year: number = new Date().getFullYear();
  colp: string = 'collapse';


  constructor() { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }


  toggle(): void {
    this.colp = this.colp === 'collapse' ? '' : 'collapse';
  }
}
