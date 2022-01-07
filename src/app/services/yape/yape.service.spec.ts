import {TestBed} from '@angular/core/testing';

import {YapeService} from './yape.service';

describe('PaymentService', () => {
    let service: YapeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(YapeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
