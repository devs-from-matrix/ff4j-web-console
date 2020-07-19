import { TestBed } from '@angular/core/testing';

import { FeatureService } from './feature.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './base.service';
import { of } from 'rxjs';

describe('FeatureService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let featureService: FeatureService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    featureService = new FeatureService(httpClientSpy as any, new BaseService());
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    expect(featureService).toBeTruthy();
  });

  it('should be able to get features', () => {
    const expectedResponse: any[] = [
      {
        uid: 'admin',
        enable: false,
        description: 'the admin page',
        group: 'admin',
        permissions: ['ROLE_ADMIN'],
        flippingStrategy: {
          type: 'org.ff4j.strategy.PonderationStrategy',
          initParams: {
            weight: '0.0',
          },
        },
        customProperties: {
          'spring.log.level': {
            name: 'spring.log.level',
            description: 'spring log level',
            type: 'org.ff4j.property.PropertyLogLevel',
            value: 'DEBUG',
          },
        },
      },
    ];

    httpClientSpy.get.and.returnValue(of(expectedResponse));
    featureService.getFeatures().subscribe((actualResponse) => expect(actualResponse).toEqual(expectedResponse));
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
