import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comments: {
    author:any;
    rating:any;
    comment:any;
  };
  commentForm: FormGroup;
  dishcopy: Dish;
  errMess:any;
  constructor(
    private fb: FormBuilder,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') public BaseURL:any
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // const id = this.route.params['id'];
    // console.log(id);
    this.dishservice
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
    // this.dish = this.dishservice.getDish(id);
    // this.dishservice.getDish(id)
    // .then(dish => this.dish = dish)
    // this.dishservice.getDish(id).subscribe(
    //   dish => this.dish = dish
    // )

    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errMess => this.errMess = <any>errMess );

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      author:'',
      rating:'',
      comment:''
    })
  }

  submitComment(){
    this.comments = this.commentForm.value;
    console.log(this.comments);
    this.commentForm.reset();
    
  }
}
