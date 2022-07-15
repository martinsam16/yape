import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {YapeService} from "../../services/yape/yape.service";

export interface DialogData {
    from: string;
}

@Component({
    selector: 'app-alias',
    templateUrl: './alias.component.html',
    styleUrls: ['./alias.component.scss']
})
export class AliasComponent implements OnInit {

    aliasForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<AliasComponent>,
                private yapeService: YapeService,
                @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    ) {
        this.aliasForm = new FormGroup({
            userAddress: new FormControl("", [Validators.required]),
            userAlias: new FormControl("", [Validators.required]),
        });
    }

    ngOnInit(): void {
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    saveAlias($event) {
        this.yapeService
            ._addAlias(this.dialogData.from, this.aliasForm.value.userAddress, this.aliasForm.value.userAlias)
            .then((r) => {
                console.log(r);
            })
            .catch((e) => {
                console.log(e);
                alert('Error en actualizar alias');
            })
    }

}
