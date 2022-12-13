import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-userchat',
  templateUrl: './userchat.page.html',
  styleUrls: ['./userchat.page.scss'],
})
export class UserchatPage implements OnInit {

  idchat: string;
  characters;

  constructor(private http: HttpClient,private activateRout:ActivatedRoute) { }

  ngOnInit() {
    this.idchat = this.activateRout.snapshot.paramMap.get('id')
    this.http.get('https://rickandmortyapi.com/api/character/'+ this.idchat).subscribe(res => this.characters = res);
  }

}
