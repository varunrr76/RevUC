import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	isLoading = false;

	constructor(private loadingController: LoadingController, private http: HTTP, private router: Router, private alertController: AlertController) { }

	async getRequest(url: string): Promise<any> {
		return this.http.get(url, {}, {});
	}

	async postRequest(url: string, data: {}): Promise<any> {
		this.http.setDataSerializer('json');
		return this.http.post(url, data, {});
	}

	async showLoading(content: string) {
		this.isLoading = true;
		return await this.loadingController.create({
			message: content
		}).then(a => {
			a.present().then(() => {
				if (!this.isLoading) {
					a.dismiss().then(() => console.log('abort presenting'));
				}
			});
		});
	}

	hideLoading = function () {
		this.isLoading = false;
		this.loadingController.dismiss().then(() => console.log('dismissed'));;
	}

	async presentAlert(content: string) {
		const alert = await this.alertController.create({
			header: 'Error',
			message: content,
			buttons: ['OK']
		});

		await alert.present();
	}

	presentDialogBox(content: string) : Promise<boolean> {

		return new Promise(async (resolve, reject) => {

			const alert = this.alertController.create({
				header: content,
				buttons: [
					{
						text: 'Yes',
						cssClass: 'danger',
						handler: () => {
							resolve(true);
						},
					},
					{
						text: 'No',
						role: 'cancel',
						cssClass: 'secondary',
						handler: () => {
							resolve(false);
						},
					}
				]
			});
			(await alert).present();
		});
	}

	navigateToURL(url: string, data: {}) {
		this.router.navigate([url], data);
	}

}
