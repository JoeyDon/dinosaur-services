"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
const cdk = require("@aws-cdk/core");
const DinosaurServices = require("../lib/dinosaur-services-stack");
test('SQS Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DinosaurServices.DinosaurServicesStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::SQS::Queue", {
        VisibilityTimeout: 300
    }));
});
test('SNS Topic Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DinosaurServices.DinosaurServicesStack(app, 'MyTestStack');
    // THEN
    assert_1.expect(stack).to(assert_1.haveResource("AWS::SNS::Topic"));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlub3NhdXItc2VydmljZXMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpbm9zYXVyLXNlcnZpY2VzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBb0U7QUFDcEUscUNBQXNDO0FBQ3RDLG1FQUFvRTtBQUVwRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO0lBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFCLE9BQU87SUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM3RSxPQUFPO0lBQ1AsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLGlCQUFpQixFQUFDO1FBQ2pELGlCQUFpQixFQUFFLEdBQUc7S0FDdkIsQ0FBQyxDQUFDLENBQUM7QUFDUixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsT0FBTztJQUNQLE1BQU0sS0FBSyxHQUFHLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzdFLE9BQU87SUFDUCxlQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhwZWN0IGFzIGV4cGVjdENESywgaGF2ZVJlc291cmNlIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgRGlub3NhdXJTZXJ2aWNlcyA9IHJlcXVpcmUoJy4uL2xpYi9kaW5vc2F1ci1zZXJ2aWNlcy1zdGFjaycpO1xuXG50ZXN0KCdTUVMgUXVldWUgQ3JlYXRlZCcsICgpID0+IHtcbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIC8vIFdIRU5cbiAgICBjb25zdCBzdGFjayA9IG5ldyBEaW5vc2F1clNlcnZpY2VzLkRpbm9zYXVyU2VydmljZXNTdGFjayhhcHAsICdNeVRlc3RTdGFjaycpO1xuICAgIC8vIFRIRU5cbiAgICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6U1FTOjpRdWV1ZVwiLHtcbiAgICAgIFZpc2liaWxpdHlUaW1lb3V0OiAzMDBcbiAgICB9KSk7XG59KTtcblxudGVzdCgnU05TIFRvcGljIENyZWF0ZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG4gIC8vIFdIRU5cbiAgY29uc3Qgc3RhY2sgPSBuZXcgRGlub3NhdXJTZXJ2aWNlcy5EaW5vc2F1clNlcnZpY2VzU3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcbiAgLy8gVEhFTlxuICBleHBlY3RDREsoc3RhY2spLnRvKGhhdmVSZXNvdXJjZShcIkFXUzo6U05TOjpUb3BpY1wiKSk7XG59KTsiXX0=