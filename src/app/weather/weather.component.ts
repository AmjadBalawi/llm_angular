import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]

})
export class WeatherComponent implements OnInit {
  city: string = ''; // Default city
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather(this.city);
  }

  getWeather(city: string): void {
    this.weatherService.getWeather(city).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  onCityChange(newCity: string): void {
    this.city = newCity;
    this.getWeather(this.city);
  }
}
