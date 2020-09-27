import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { ModuleWithProviders, NgModule } from "@angular/core";
//import { NgxPermissionsModule } from 'ngx-permissions';
import {WA_MAT_CONFIRM_DIALOG_DEFAULTS, WaMatConfirmDialogModule} from '@webacad/material-confirm-dialog';

import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from "@angular/common";
import { DigitOnlyDirective, MaskDirective } from './directive/digit-only.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorComponent } from './component/error/error.component';
import { GridFilterComponent } from './component/grid-filter/grid-filter.component';
import { HeaderDialogComponent } from './component/header-dialog/header-dialog.component';
import { MNComboBoxComponent } from './component/mncombo-box/mncombo-box.component';
import { MNDatePickerComponent } from './component/mn-datepicker/mn-datepicker.component';
import { MNInputComponent } from './component/mn-input/mninput.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import{MatListModule} from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
import {MatTreeModule} from '@angular/material/tree';
import { MenuListItemComponent } from './component/menu-list-item/menu-list-item.component';
import { MnImageUploadComponent } from './component/mn-image-upload/mn-image-upload.component';
import { MnNumberInputComponent } from './component/mn-number-input/mn-number-input.component';
import { MnSelectFilterComponent } from './component/mn-select-filter/mn-select-filter.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PublicService } from '../core/services/publicService';
import { PublicShareService } from './service/public-share-service';
import { RequiredIfDirective } from './directive/required-if.directive';
import { SelectItemComponent } from './component/select-item/select-item.component';
 
import { ShareDataService } from './service/share-data-service';
 
import { UploadFileComponent } from './component/upload-field-file.component';
import { MNTextAreaComponent } from './component/mntext-area/mntext-area.component';
import { FileDownloadComponent } from './component/file-download/file-download.component';
import { HttpClient } from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MNCommentComponent } from './component/mncomment/mncomment.component';
import { CommentViewComponent } from './component/comment-view/comment-view.component';
import { getDutchPaginatorIntl } from './service/lang-paginator-intl';
 
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "./service/material.persian-date.adapter";
import { FlexLayoutModule } from '@angular/flex-layout';
import { UnsureConfirmDialogDefaults } from './service/UnsureConfirmDialogDefaults';
import { MomentJalaaliPipe } from './pipes/MomentJalaaliPipe';
import { MnFilterPipe } from './pipes/mn-filter-pipe';
import { TreeViewComponent } from './component/tree-view/tree-view.component';
import { CodeInputModule } from 'angular-code-input';
export function customHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    //PaginationModule.forRoot(),
    CodeInputModule,
    WaMatConfirmDialogModule,
    DragDropModule,
    MatTreeModule,
    // NgbModule,
    MatSidenavModule,
    TranslateModule,
    MatRippleModule,
    MatSlideToggleModule,
    //NgxScrollToFirstInvalidModule,
    //NgHttpLoaderModule.forRoot(),
    //ToastrModule.forRoot( { timeOut:4000, positionClass: 'toast-top-full-width' }),
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatPseudoCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
     MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    FlexLayoutModule

  ],
  entryComponents: [
    TreeViewComponent
  ],
  providers: [ShareDataService,PublicShareService,PublicService,
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
  ],

  declarations: [
    ErrorComponent,
    HeaderDialogComponent,
    SelectItemComponent,
    MNInputComponent,
    MnNumberInputComponent,
    MnImageUploadComponent,
    MnSelectFilterComponent,
    MNDatePickerComponent,
    GridFilterComponent,
    MenuListItemComponent,
    RequiredIfDirective,
    DigitOnlyDirective,
    MNComboBoxComponent,
    TreeViewComponent,
    UploadFileComponent,
    MNTextAreaComponent,
    FileDownloadComponent,
    MNCommentComponent,
    CommentViewComponent,
    MnFilterPipe,
    MaskDirective,
    MomentJalaaliPipe  
    // common and shared components/directives/pipes between more than one module and components will be listed here.
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPermissionsModule,
    MatSidenavModule,
    MatNativeDateModule,
    CodeInputModule,
    //PaginationModule,
    WaMatConfirmDialogModule,
    DragDropModule,
    MatTreeModule,
    MatSlideToggleModule,
    // BrowserAnimationsModule,
    //  NgxScrollToFirstInvalidModule,
    // ToastrModule,
    //NgxPermissionsModule,
    MatRippleModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    MatCardModule,
    MatPseudoCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    ErrorComponent,
    HeaderDialogComponent,
    SelectItemComponent,
    MNInputComponent,
    MNTextAreaComponent,
    MnNumberInputComponent,
    MnImageUploadComponent,
    MnSelectFilterComponent,
    MNDatePickerComponent,
    MNComboBoxComponent,
    MenuListItemComponent,
    RequiredIfDirective,
    UploadFileComponent,
    GridFilterComponent,
    DigitOnlyDirective,
    FileDownloadComponent,
    MNCommentComponent, 
    MomentJalaaliPipe,
    TranslateModule,
    MnFilterPipe,
    MaskDirective
  ]
  /* No providers here! Since they’ll be already provided in AppModule. */
})
export class SharedModule {

   


  static forRoot(): ModuleWithProviders<SharedModule> {
    // Forcing the whole app to use the returned providers from the AppModule only.
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: WA_MAT_CONFIRM_DIALOG_DEFAULTS,
          useClass: UnsureConfirmDialogDefaults,
      },
       
       
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' } }
        /* All of your services here. It will hold the services needed by `itself`. */]
    };
  }
}
