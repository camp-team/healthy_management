import { Component, OnInit, Inject } from '@angular/core';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recipe-thumbnail',
  templateUrl: './recipe-thumbnail.component.html',
  styleUrls: ['./recipe-thumbnail.component.scss'],
})
export class RecipeThumbnailComponent implements OnInit {
  croppedImage: string;
  userId: string = this.authSerrvice.uid;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      imageFile: File;
      thumbnailURL: string;
    },
    private recipeService: RecipeService,
    private authSerrvice: AuthService,
    private dialogRef: MatDialogRef<RecipeThumbnailComponent>
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  async uploadImage(userId: string): Promise<void> {
    const file: Blob = base64ToFile(this.croppedImage);
    const downloadURL: string = await this.recipeService.uploadThumbnail(
      userId,
      file
    );
    this.dialogRef.close(downloadURL);
  }
  cancel() {
    this.dialogRef.close(this.data.thumbnailURL);
  }
  deleteImage() {
    this.dialogRef.close(null);
  }
  ngOnInit(): void {}
}
