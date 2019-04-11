import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { jqxSchedulerComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxscheduler.ts';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {
   @ViewChild('scheduler') scheduler: jqxSchedulerComponent;

  date: any = new jqx.date(2018, 10, 23);
  source: any;
  resources: any;
  dataAdapter: any;
  appointments = new Array();
  views: any[] =
    [
      { type: 'timelineDayView', appointmentHeight: 30, rowHeight: 50 },
    ];

  appointmentDataFields: any =
    {
      from: 'start',
      to: 'end',
      id: 'id',
      description: 'description',
      location: 'place',
      subject: 'subject',
      resourceId: 'calendar'
    };

  constructor() {
  }

  ngAfterViewInit() {
    this.scheduler.ensureAppointmentVisible('id1');
  }

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }

  ngOnInit() {
    this.generateAppointments();
    this.createSource();
  }

  generateAppointments() {
    const appointments = new Array();
    const appointment1 = {
      id: 'id1',
      description: 'George brings projector for presentations.',
      location: '',
      subject: 'Quarterly Project Review Meeting',
      calendar: 'Room 1',
      start: new Date(2019, 3, 11, 1),
      end: new Date(2019, 3, 11, 2)
    }
    const appointment2 = {
      id: 'id1',
      description: '',
      location: '',
      subject: 'IT Group Mtg.',
      calendar: 'Room 1',
      start: new Date(2019, 3, 11, 1),
      end: new Date(2019, 3, 11, 2)
    }
    const appointment3 = {
      id: 'id3',
      description: '',
      location: '',
      subject: 'IT Group Mtg.',
      calendar: 'Room 2',
      start: new Date(),
      end: new Date()
    }
   
    this.appointments.push(appointment1);
    this.appointments.push(appointment2);
    this.appointments.push(appointment3);
    
    return this.appointments;
  }

  dateChange(event: any): void {
    
  }

  createSource() {
    console.log('in create source' + this.appointments.length);
    this.source = {
      dataType: 'array',
      dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'calendar', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ],
      id: 'id',
      localData: this.appointments
    };

    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.resources = {
      dataField: 'calendar',
      orientation: 'vertical',
      source: new jqx.dataAdapter(this.source)
    };

    
  }
}