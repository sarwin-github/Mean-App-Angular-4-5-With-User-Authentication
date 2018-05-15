import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://localhost:4201/api/signup';

@Injectable()
export class UserRegistrationService {
	private isUserLoggedIn: any;

	constructor(private http: Http, private router: Router) { this.isUserLoggedIn = false; }

	// get signup and fitness options anti-csrf token
	signup(type): Observable<any>{
		return this.http
		.get(`${endpoint}`, { withCredentials : true})
		.map(res => res.json())
		.catch(this.handleError)
	}

	// post signup user
	postSignUp(body: any, option:any): Observable<any>{
		return this.http
		.post(`${endpoint}`, body, option)
		.map(res => res.json())
		.catch(this.handleError)
	}

	// set login status to true in local storage
	setUserLogin(status: any): void {
		sessionStorage.setItem('userLogin', status);
		this.isUserLoggedIn = true;
	}

	// get login status from local storage
	getUserLogin(): any {
		let storedItem:any = sessionStorage.getItem('userLogin');
        if(!storedItem) return false;
        	else return storedItem;
	}

	// error handler
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	}
}
