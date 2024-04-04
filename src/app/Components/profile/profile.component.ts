import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UpdateProfileComponent, HttpClientModule, RouterOutlet],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any;
  profileFormVisible = false;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.user = {name: params['name'], email: params['email'], phone: params['phone'], age: params['age'], street: params['street'], city: params['city']}
    });
  }

  toggleProfileForm() {
    this.profileFormVisible = !this.profileFormVisible;
  }
}
