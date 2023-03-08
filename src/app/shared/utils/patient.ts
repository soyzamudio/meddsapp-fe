import { Patient } from '../interfaces';
import { Chance } from 'chance';

const chance = new Chance();

export function generatePatients(n: number): Patient[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i.toString(),
    createdAt: chance.date(),
    name: chance.name(),
    dob: chance.birthday(),
    gender: chance.gender(),
    lifestyleInformation: {
      smoking: chance.bool(),
      alcohol: chance.bool(),
      exercise: chance.bool(),
      diet: chance.bool(),
    },
    contactDetails: {
      email: chance.email(),
      phone: chance.phone(),
      address: {
        street: chance.address(),
        city: chance.city(),
        state: chance.state(),
        zip: chance.zip(),
      },
    },
    allergies: Array.from(
      { length: chance.integer({ min: 0, max: 10 }) },
      (_, i) => ({
        name: chance.word({ length: 10 }),
        reaction: chance.word({ length: 10 }),
      })
    ),
    lastConsultation: chance.bool() ? {
      patientId: i.toString(),
      date: new Date(chance.date({ year: 2022 })),
    } : null,
    nextConsultation: chance.bool() ? {
      patientId: i.toString(),
      date: new Date(),
    } : null,
    active: chance.bool(),
    medicalHistory: {
      conditions: Array.from(
        { length: chance.integer({ min: 0, max: 10 }) },
        (_, i) => chance.word({ length: 10 })
      ),
      surgeries: Array.from(
        { length: chance.integer({ min: 0, max: 10 }) },
        (_, i) => ({
          name: chance.word({ length: 10 }),
          date: new Date(chance.date({ year: 2022 })),
        })
      ),
      hospitalizations: Array.from(
        { length: chance.integer({ min: 0, max: 10 }) },
        (_, i) => ({
          reason: chance.word({ length: 10 }),
          date: new Date(chance.date({ year: 2022 })),
          days: chance.integer({ min: 1, max: 10 }),
        })
      ),
    },
    medications: Array.from(
      { length: chance.integer({ min: 0, max: 6 }) },
      (_, i) => ({
        name: chance.word(),
        dosage:
          chance.integer({ min: 1, max: 10 }) +
          chance.pickone(['mg', 'g', 'ml']),
        startDate: new Date(chance.date({ year: 2022 })),
        endDate: new Date(
          chance.date({ year: +chance.year({ min: 2020, max: 2024 }) })
        ),
      })
    ).sort((a, b) => +new Date(b.endDate) - +new Date(a.endDate)),
    basicMedicalInformation: [
      {
        takenAt: new Date(chance.date({ year: 2022 })),
        information: {
          height: chance.integer({ min: 100, max: 200 }),
          weight: chance.integer({ min: 40, max: 100 }),
          bloodType: chance.pickone([
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-',
          ]),
          bloodPressure:
            chance.integer({ min: 80, max: 120 }) +
            '/' +
            chance.integer({ min: 80, max: 120 }),
          heartRate: chance.integer({ min: 60, max: 100 }),
          respiratoryRate: chance.integer({ min: 10, max: 20 }),
          temperature: null,
        },
      },
      {
        takenAt: new Date(chance.date({ year: 2022 })),
        information: {
          height: chance.integer({ min: 100, max: 200 }),
          weight: chance.integer({ min: 40, max: 100 }),
          bloodType: chance.pickone([
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-',
          ]),
          bloodPressure:
            chance.integer({ min: 80, max: 120 }) +
            '/' +
            chance.integer({ min: 80, max: 120 }),
          heartRate: chance.integer({ min: 60, max: 100 }),
          respiratoryRate: chance.integer({ min: 10, max: 20 }),
          temperature: null,
        },
      },
    ],
  }));
}
