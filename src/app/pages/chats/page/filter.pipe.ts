import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myChatFilter',
    pure: false
})

export class ChatFilterPipe implements PipeTransform {
    public transform(items: any[], filterValue: number): any {
        // I am unsure what id is here. did you mean title?
        console.log(filterValue);

        switch (filterValue) {
            case 0: {
                return items;
            }
            case 1: {
                return items.filter((item) => item.newMessages === true);
            }
            case 2: {
                return items.filter((item) => item.marked === 1);
            }
        }
    }
}