import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BackendService } from './backend.service';
import { User } from 'contracts/User';


describe('BackendService', () => {
  let service: BackendService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BackendService
      ]
    });
    service = TestBed.inject(BackendService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const users: User[] = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    service.getUsers().subscribe(response => {
      expect(response).toEqual(users);
    });
    const req = httpTestingController.expectOne('http://localhost:9001/api/users/');
    expect(req.request.method).toEqual('GET');
    req.flush(users);
  });
});
