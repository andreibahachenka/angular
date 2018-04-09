import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationService {
    private configSuccess: MatSnackBarConfig = this.createConfigForSuccess();
    private configError: MatSnackBarConfig = this.createConfigForError();
    private configWarning: MatSnackBarConfig = this.createConfigForWarning();

    constructor(public snackBar: MatSnackBar) {
    }

    public ok(message: string) {
        this.snackBar.open(message, 'Success', this.configSuccess);
    }

    public error(message: string) {
        this.snackBar.open(message, 'Error', this.configError);
    }

    public warning(message: string) {
        this.snackBar.open(message, 'Warning', this.configWarning);
    }

    private createConfigForSuccess(): MatSnackBarConfig {
       const config = new MatSnackBarConfig();
       config.panelClass = ['notification-success'];
       config.duration = 3000;
       config.horizontalPosition = 'center';    // 'start' || 'center' || 'end' || 'left' || 'right';
       config.verticalPosition = 'bottom';      // 'top' || 'bottom'
       config.direction = 'ltr';                // 'ltr' || 'rtl';
       config.politeness = 'polite';            // 'off' || 'polite' || 'assertive';
       return config;
    }

    private createConfigForError(): MatSnackBarConfig {
        const config = new MatSnackBarConfig();
        config.panelClass = ['notification-error'];
        config.duration = 3000;
        config.horizontalPosition = 'center';    // 'start' || 'center' || 'end' || 'left' || 'right';
        config.verticalPosition = 'bottom';      // 'top' || 'bottom'
        config.direction = 'ltr';                // 'ltr' || 'rtl';
        config.politeness = 'polite';            // 'off' || 'polite' || 'assertive';
        return config;
    }

    private createConfigForWarning(): MatSnackBarConfig {
        const config = new MatSnackBarConfig();
        config.panelClass = ['notification-warning'];
        config.duration = 3000;
        config.horizontalPosition = 'center';    // 'start' || 'center' || 'end' || 'left' || 'right';
        config.verticalPosition = 'bottom';      // 'top' || 'bottom'
        config.direction = 'ltr';                // 'ltr' || 'rtl';
        config.politeness = 'polite';            // 'off' || 'polite' || 'assertive';
        return config;
    }
}
