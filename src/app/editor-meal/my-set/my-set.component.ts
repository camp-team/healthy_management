import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Set } from 'src/app/interfaces/set';
import { DailyMeal } from 'src/app/interfaces/daily-info';
import { DailyInfoService } from 'src/app/services/daily-info.service';
import { AuthService } from 'src/app/services/auth.service';
import { SetService } from 'src/app/services/set.service';
import { AverageService } from 'src/app/services/average.service';

@Component({
  selector: 'app-my-set',
  templateUrl: './my-set.component.html',
  styleUrls: ['./my-set.component.scss'],
})
export class MySetComponent implements OnInit, OnDestroy {
  amount = {};
  date: string;
  meal: string;
  sets$: Observable<Set[]>;
  totalCal$: Observable<number>;
  routerSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private dailyInfoService: DailyInfoService,
    private authService: AuthService,
    private setService: SetService,
    private router: Router,
    private averageService: AverageService
  ) {
    this.route.queryParamMap.subscribe((paramMaps) => {
      this.date = paramMaps.get('date');
      this.meal = paramMaps.get('meal');
    });
    this.sets$ = this.setService.getSetsOfMeal(this.authService.uid, this.meal);
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.averageService.averageTotalCal(this.authService.uid, this.date);
        console.log(this.date, 'ts');
      }
    });
  }
  addSet(amount: number, setId: string, setCal: number) {
    const meal: DailyMeal = { mealId: '', setId, amount };
    this.dailyInfoService.addMeal(
      meal,
      this.authService.uid,
      this.date,
      'set',
      setCal
    );
  }

  outSet(setId: string) {
    this.setService.updateMeal(this.authService.uid, setId, this.meal, false);
  }
  goToSetPage() {
    this.dailyInfoService.goToSetPage(this.date, this.meal);
  }

  ngOnInit(): void {
    this.dailyInfoService.whichMeal$.subscribe((whichMeal) => {
      if (whichMeal !== 'notChange') {
        this.meal = whichMeal;

        this.sets$ = this.setService.getSetsOfMeal(
          this.authService.uid,
          this.meal
        );
      }
    });
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
