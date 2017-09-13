import { expect } from 'chai'
import { Observable, EmptyError } from 'rxjs'

describe('onErrorResumeNext', () => {
  it('onErrorResumeNext should return -1', (done) => {
    Observable.forkJoin([
      Observable.of(1),
      Observable.of(2),
      Observable.throw(new Error('UNKNOWN')),
      Observable.of(2),
    ]).onErrorResumeNext(Observable.of(-1))
    .subscribe((res) => {
      expect(res).equal(-1)
      done()
    })
  });
});
