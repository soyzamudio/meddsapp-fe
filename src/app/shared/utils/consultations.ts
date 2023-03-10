import { Consultation } from './../interfaces/index';
import { Patient } from '../interfaces';
import { Chance } from 'chance';

const chance = new Chance();

export function generateConsultations(n: number): Consultation[] {
  return Array.from({ length: n }).map(() => ({
    patientId: chance.guid(),
    title: chance.name(),
    date: new Date(
      chance.date({
        year: 2023,
        month: 2,
        day: chance.integer({ min: 0, max: 30 }),
      })
    ),
    time: `${chance.integer({ min: 7, max: 17})}:00`,
    notes: chance.paragraph(),
    confirmed: false,
  }));
}
