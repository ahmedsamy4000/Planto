import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UpdateProfileComponent, HttpClientModule, RouterOutlet,LoadingComponent],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  profileFormVisible = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.GetUser().subscribe({
      next:(data)=>{
        this.user=data;
        this.user=this.user.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  toggleProfileForm() {
    this.profileFormVisible = !this.profileFormVisible;
  }
}
