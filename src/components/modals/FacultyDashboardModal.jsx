import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FACULTY, UPCOMING_BATCHES, COURSES } from '../../data/mockData';
import { 
  X, 
  BookOpen, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  Video, 
  Send, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Star, 
  Award,
  Search,
  CheckCheck,
  UserX,
  Save,
  Filter,
  Layers,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

// Pre-defined student cohorts totaling 145 students under Dr. Sarah Jenkins
const BATCH_COHORTS = {
  'b-fs01': {
    id: 'b-fs01',
    code: 'Batch FS-01',
    name: 'Full-Stack Web Development Masterclass',
    cohort: 'Oct 2026 Cohort',
    schedule: 'Mon & Wed (6:00 PM - 8:30 PM EST)',
    totalEnrolled: 38,
    students: [
      { id: 'fs-1', roll: 'NEX-FS-01', name: 'Alexander Wright', email: 'alex.w@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'fs-2', roll: 'NEX-FS-02', name: 'Beatrix Vance', email: 'beatrix.v@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'fs-3', roll: 'NEX-FS-03', name: 'Cameron Diaz', email: 'cameron.d@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'fs-4', roll: 'NEX-FS-04', name: 'Daniel Craig', email: 'daniel.c@nexusacademy.edu', progress: '78%', status: 'On Leave' },
      { id: 'fs-5', roll: 'NEX-FS-05', name: 'Emma Watson', email: 'emma.w@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'fs-6', roll: 'NEX-FS-06', name: 'Felix Kjellberg', email: 'felix.k@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'fs-7', roll: 'NEX-FS-07', name: 'Grace Hopper', email: 'grace.h@nexusacademy.edu', progress: '98%', status: 'Present' },
      { id: 'fs-8', roll: 'NEX-FS-08', name: 'Henry Cavill', email: 'henry.c@nexusacademy.edu', progress: '82%', status: 'Present' },
      { id: 'fs-9', roll: 'NEX-FS-09', name: 'Isabella Ross', email: 'isabella.r@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'fs-10', roll: 'NEX-FS-10', name: 'James Wilson', email: 'james.w@nexusacademy.edu', progress: '76%', status: 'On Leave' },
      { id: 'fs-11', roll: 'NEX-FS-11', name: 'Katherine Pierce', email: 'kat.p@nexusacademy.edu', progress: '93%', status: 'Present' },
      { id: 'fs-12', roll: 'NEX-FS-12', name: 'Liam Neeson', email: 'liam.n@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'fs-13', roll: 'NEX-FS-13', name: 'Maya Lin', email: 'maya.l@nexusacademy.edu', progress: '89%', status: 'Present' },
      { id: 'fs-14', roll: 'NEX-FS-14', name: 'Noah Centineo', email: 'noah.c@nexusacademy.edu', progress: '81%', status: 'Present' },
      { id: 'fs-15', roll: 'NEX-FS-15', name: 'Olivia Rodrigo', email: 'olivia.r@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'fs-16', roll: 'NEX-FS-16', name: 'Peter Parker', email: 'peter.p@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'fs-17', roll: 'NEX-FS-17', name: 'Quinn Fabray', email: 'quinn.f@nexusacademy.edu', progress: '83%', status: 'Present' },
      { id: 'fs-18', roll: 'NEX-FS-18', name: 'Rachel Green', email: 'rachel.g@nexusacademy.edu', progress: '79%', status: 'On Leave' },
      { id: 'fs-19', roll: 'NEX-FS-19', name: 'Samuel Jackson', email: 'sam.j@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'fs-20', roll: 'NEX-FS-20', name: 'Tara Knowles', email: 'tara.k@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'fs-21', roll: 'NEX-FS-21', name: 'Uma Thurman', email: 'uma.t@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'fs-22', roll: 'NEX-FS-22', name: 'Victor Stone', email: 'victor.s@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'fs-23', roll: 'NEX-FS-23', name: 'Wanda Maximoff', email: 'wanda.m@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'fs-24', roll: 'NEX-FS-24', name: 'Xavier Woods', email: 'xavier.w@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'fs-25', roll: 'NEX-FS-25', name: 'Yara Shahidi', email: 'yara.s@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'fs-26', roll: 'NEX-FS-26', name: 'Zack Snyder', email: 'zack.s@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'fs-27', roll: 'NEX-FS-27', name: 'Aaron Paul', email: 'aaron.p@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'fs-28', roll: 'NEX-FS-28', name: 'Bella Thorne', email: 'bella.t@nexusacademy.edu', progress: '75%', status: 'On Leave' },
      { id: 'fs-29', roll: 'NEX-FS-29', name: 'Chris Evans', email: 'chris.e@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'fs-30', roll: 'NEX-FS-30', name: 'David Tennant', email: 'david.t@nexusacademy.edu', progress: '89%', status: 'Present' },
      { id: 'fs-31', roll: 'NEX-FS-31', name: 'Elena Gilbert', email: 'elena.g@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'fs-32', roll: 'NEX-FS-32', name: 'Finn Wolfhard', email: 'finn.w@nexusacademy.edu', progress: '93%', status: 'Present' },
      { id: 'fs-33', roll: 'NEX-FS-33', name: 'Gina Torres', email: 'gina.t@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'fs-34', roll: 'NEX-FS-34', name: 'Hugh Jackman', email: 'hugh.j@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'fs-35', roll: 'NEX-FS-35', name: 'Iris West', email: 'iris.w@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'fs-36', roll: 'NEX-FS-36', name: 'John Krasinski', email: 'john.k@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'fs-37', roll: 'NEX-FS-37', name: 'Keanu Reeves', email: 'keanu.r@nexusacademy.edu', progress: '99%', status: 'Present' },
      { id: 'fs-38', roll: 'NEX-FS-38', name: 'Lucy Liu', email: 'lucy.l@nexusacademy.edu', progress: '88%', status: 'Present' }
    ]
  },
  'b-fs02': {
    id: 'b-fs02',
    code: 'Batch FS-02',
    name: 'Modern Next.js 14 & Cloud Systems',
    cohort: 'Nov 2026 Cohort',
    schedule: 'Tue & Thu (7:00 PM - 9:30 PM EST)',
    totalEnrolled: 36,
    students: [
      { id: 'nxt-1', roll: 'NEX-NX-01', name: 'Carlos Mendez', email: 'carlos.m@nexusacademy.edu', progress: '89%', status: 'Present' },
      { id: 'nxt-2', roll: 'NEX-NX-02', name: 'Diana Prince', email: 'diana.p@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'nxt-3', roll: 'NEX-NX-03', name: 'Ethan Hunt', email: 'ethan.h@nexusacademy.edu', progress: '81%', status: 'Present' },
      { id: 'nxt-4', roll: 'NEX-NX-04', name: 'Fiona Gallagher', email: 'fiona.g@nexusacademy.edu', progress: '78%', status: 'On Leave' },
      { id: 'nxt-5', roll: 'NEX-NX-05', name: 'George Clark', email: 'george.c@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'nxt-6', roll: 'NEX-NX-06', name: 'Hannah Montana', email: 'hannah.m@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'nxt-7', roll: 'NEX-NX-07', name: 'Ian Somerhalder', email: 'ian.s@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'nxt-8', roll: 'NEX-NX-08', name: 'Jessica Jones', email: 'jessica.j@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'nxt-9', roll: 'NEX-NX-09', name: 'Kevin Bacon', email: 'kevin.b@nexusacademy.edu', progress: '83%', status: 'Present' },
      { id: 'nxt-10', roll: 'NEX-NX-10', name: 'Laura Croft', email: 'laura.c@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'nxt-11', roll: 'NEX-NX-11', name: 'Michael Scott', email: 'michael.s@nexusacademy.edu', progress: '74%', status: 'On Leave' },
      { id: 'nxt-12', roll: 'NEX-NX-12', name: 'Natasha Romanoff', email: 'natasha.r@nexusacademy.edu', progress: '98%', status: 'Present' },
      { id: 'nxt-13', roll: 'NEX-NX-13', name: 'Oscar Isaac', email: 'oscar.i@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'nxt-14', roll: 'NEX-NX-14', name: 'Piper Halliwell', email: 'piper.h@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'nxt-15', roll: 'NEX-NX-15', name: 'Quentin Tarantino', email: 'quentin.t@nexusacademy.edu', progress: '82%', status: 'Present' },
      { id: 'nxt-16', roll: 'NEX-NX-16', name: 'Robert Downey', email: 'robert.d@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'nxt-17', roll: 'NEX-NX-17', name: 'Scarlett Johansson', email: 'scarlett.j@nexusacademy.edu', progress: '93%', status: 'Present' },
      { id: 'nxt-18', roll: 'NEX-NX-18', name: 'Tom Holland', email: 'tom.h@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'nxt-19', roll: 'NEX-NX-19', name: 'Ursula Buffay', email: 'ursula.b@nexusacademy.edu', progress: '79%', status: 'On Leave' },
      { id: 'nxt-20', roll: 'NEX-NX-20', name: 'Vincent Vega', email: 'vincent.v@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'nxt-21', roll: 'NEX-NX-21', name: 'Walter White', email: 'walter.w@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'nxt-22', roll: 'NEX-NX-22', name: 'Xena Warrior', email: 'xena.w@nexusacademy.edu', progress: '89%', status: 'Present' },
      { id: 'nxt-23', roll: 'NEX-NX-23', name: 'Yvaine Star', email: 'yvaine.s@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'nxt-24', roll: 'NEX-NX-24', name: 'Zoe Saldana', email: 'zoe.s@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'nxt-25', roll: 'NEX-NX-25', name: 'Arthur Pendragon', email: 'arthur.p@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'nxt-26', roll: 'NEX-NX-26', name: 'Bruce Wayne', email: 'bruce.w@nexusacademy.edu', progress: '99%', status: 'Present' },
      { id: 'nxt-27', roll: 'NEX-NX-27', name: 'Clark Kent', email: 'clark.k@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'nxt-28', roll: 'NEX-NX-28', name: 'Daisy Johnson', email: 'daisy.j@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'nxt-29', roll: 'NEX-NX-29', name: 'Edward Norton', email: 'edward.n@nexusacademy.edu', progress: '82%', status: 'Present' },
      { id: 'nxt-30', roll: 'NEX-NX-30', name: 'Felicity Smoak', email: 'felicity.s@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'nxt-31', roll: 'NEX-NX-31', name: 'Gwen Stacy', email: 'gwen.s@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'nxt-32', roll: 'NEX-NX-32', name: 'Harry Potter', email: 'harry.p@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'nxt-33', roll: 'NEX-NX-33', name: 'Ilsa Faust', email: 'ilsa.f@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'nxt-34', roll: 'NEX-NX-34', name: 'Jack Reacher', email: 'jack.r@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'nxt-35', roll: 'NEX-NX-35', name: 'Kara Danvers', email: 'kara.d@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'nxt-36', roll: 'NEX-NX-36', name: 'Logan Howlett', email: 'logan.h@nexusacademy.edu', progress: '83%', status: 'On Leave' }
    ]
  },
  'b-cld01': {
    id: 'b-cld01',
    code: 'Batch CLD-01',
    name: 'Cloud Architecture & DevOps CI/CD',
    cohort: 'Dec 2026 Cohort',
    schedule: 'Saturdays (10:00 AM - 1:00 PM EST)',
    totalEnrolled: 35,
    students: [
      { id: 'cld-1', roll: 'NEX-CL-01', name: 'Miles Morales', email: 'miles.m@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'cld-2', roll: 'NEX-CL-02', name: 'Natasha Rostova', email: 'natasha.ro@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'cld-3', roll: 'NEX-CL-03', name: 'Oliver Queen', email: 'oliver.q@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'cld-4', roll: 'NEX-CL-04', name: 'Peggy Carter', email: 'peggy.c@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'cld-5', roll: 'NEX-CL-05', name: 'Quincy Jones', email: 'quincy.j@nexusacademy.edu', progress: '82%', status: 'Present' },
      { id: 'cld-6', roll: 'NEX-CL-06', name: 'Ron Weasley', email: 'ron.w@nexusacademy.edu', progress: '78%', status: 'On Leave' },
      { id: 'cld-7', roll: 'NEX-CL-07', name: 'Steve Rogers', email: 'steve.r@nexusacademy.edu', progress: '98%', status: 'Present' },
      { id: 'cld-8', roll: 'NEX-CL-08', name: 'Tony Stark', email: 'tony.s@nexusacademy.edu', progress: '99%', status: 'Present' },
      { id: 'cld-9', roll: 'NEX-CL-09', name: 'Uma Thurman', email: 'uma.t2@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'cld-10', roll: 'NEX-CL-10', name: 'Vito Corleone', email: 'vito.c@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'cld-11', roll: 'NEX-CL-11', name: 'Willy Wonka', email: 'willy.w@nexusacademy.edu', progress: '80%', status: 'On Leave' },
      { id: 'cld-12', roll: 'NEX-CL-12', name: 'Xander Cage', email: 'xander.c@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'cld-13', roll: 'NEX-CL-13', name: 'Yoda Master', email: 'yoda.m@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'cld-14', roll: 'NEX-CL-14', name: 'Zorro Fox', email: 'zorro.f@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'cld-15', roll: 'NEX-CL-15', name: 'Arya Stark', email: 'arya.s@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'cld-16', roll: 'NEX-CL-16', name: 'Bran Stark', email: 'bran.s@nexusacademy.edu', progress: '89%', status: 'Present' },
      { id: 'cld-17', roll: 'NEX-CL-17', name: 'Cersei Lannister', email: 'cersei.l@nexusacademy.edu', progress: '83%', status: 'Present' },
      { id: 'cld-18', roll: 'NEX-CL-18', name: 'Daenerys Targaryen', email: 'dany.t@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'cld-19', roll: 'NEX-CL-19', name: 'Eddard Stark', email: 'eddard.s@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'cld-20', roll: 'NEX-CL-20', name: 'Frodo Baggins', email: 'frodo.b@nexusacademy.edu', progress: '81%', status: 'On Leave' },
      { id: 'cld-21', roll: 'NEX-CL-21', name: 'Gandalf Grey', email: 'gandalf.g@nexusacademy.edu', progress: '98%', status: 'Present' },
      { id: 'cld-22', roll: 'NEX-CL-22', name: 'Hermione Granger', email: 'hermione.g@nexusacademy.edu', progress: '100%', status: 'Present' },
      { id: 'cld-23', roll: 'NEX-CL-23', name: 'Indiana Jones', email: 'indy.j@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'cld-24', roll: 'NEX-CL-24', name: 'Jon Snow', email: 'jon.s@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'cld-25', roll: 'NEX-CL-25', name: 'Katniss Everdeen', email: 'katniss.e@nexusacademy.edu', progress: '93%', status: 'Present' },
      { id: 'cld-26', roll: 'NEX-CL-26', name: 'Legolas Greenleaf', email: 'legolas.g@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'cld-27', roll: 'NEX-CL-27', name: 'Marty McFly', email: 'marty.m@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'cld-28', roll: 'NEX-CL-28', name: 'Neo Anderson', email: 'neo.a@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'cld-29', roll: 'NEX-CL-29', name: 'Obi-Wan Kenobi', email: 'obiwan.k@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'cld-30', roll: 'NEX-CL-30', name: 'Padme Amidala', email: 'padme.a@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'cld-31', roll: 'NEX-CL-31', name: 'Quill Star-Lord', email: 'peter.q@nexusacademy.edu', progress: '77%', status: 'On Leave' },
      { id: 'cld-32', roll: 'NEX-CL-32', name: 'Ripley Ellen', email: 'ellen.r@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'cld-33', roll: 'NEX-CL-33', name: 'Sarah Connor', email: 'sarah.c@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'cld-34', roll: 'NEX-CL-34', name: 'Trinity Matrix', email: 'trinity.m@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'cld-35', roll: 'NEX-CL-35', name: 'Uhura Nyota', email: 'nyota.u@nexusacademy.edu', progress: '90%', status: 'Present' }
    ]
  },
  'b-arch02': {
    id: 'b-arch02',
    code: 'Batch ARCH-02',
    name: 'Enterprise Distributed Systems & Scalability',
    cohort: 'Jan 2027 Cohort',
    schedule: 'Sundays (2:00 PM - 5:00 PM EST)',
    totalEnrolled: 36,
    students: [
      { id: 'arch-1', roll: 'NEX-AR-01', name: 'Vito Genovese', email: 'vito.g@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'arch-2', roll: 'NEX-AR-02', name: 'Wade Wilson', email: 'wade.w@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'arch-3', roll: 'NEX-AR-03', name: 'Xavier Charles', email: 'charles.x@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'arch-4', roll: 'NEX-AR-04', name: 'Ygritte Wild', email: 'ygritte.w@nexusacademy.edu', progress: '82%', status: 'Present' },
      { id: 'arch-5', roll: 'NEX-AR-05', name: 'Zatanna Zatara', email: 'zatanna.z@nexusacademy.edu', progress: '93%', status: 'Present' },
      { id: 'arch-6', roll: 'NEX-AR-06', name: 'Anakin Skywalker', email: 'anakin.s@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'arch-7', roll: 'NEX-AR-07', name: 'Buffy Summers', email: 'buffy.s@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'arch-8', roll: 'NEX-AR-08', name: 'Clarice Starling', email: 'clarice.s@nexusacademy.edu', progress: '89%', status: 'Present' },
      { id: 'arch-9', roll: 'NEX-AR-09', name: 'Doc Brown', email: 'doc.b@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'arch-10', roll: 'NEX-AR-10', name: 'Edward Elric', email: 'edward.e@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'arch-11', roll: 'NEX-AR-11', name: 'Fox Mulder', email: 'fox.m@nexusacademy.edu', progress: '79%', status: 'On Leave' },
      { id: 'arch-12', roll: 'NEX-AR-12', name: 'Gollum Smeagol', email: 'smeagol.g@nexusacademy.edu', progress: '71%', status: 'On Leave' },
      { id: 'arch-13', roll: 'NEX-AR-13', name: 'Han Solo', email: 'han.s@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'arch-14', roll: 'NEX-AR-14', name: 'Inigo Montoya', email: 'inigo.m@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'arch-15', roll: 'NEX-AR-15', name: 'Jack Sparrow', email: 'jack.s@nexusacademy.edu', progress: '83%', status: 'Present' },
      { id: 'arch-16', roll: 'NEX-AR-16', name: 'Katara Water', email: 'katara.w@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'arch-17', roll: 'NEX-AR-17', name: 'Luke Skywalker', email: 'luke.s@nexusacademy.edu', progress: '98%', status: 'Present' },
      { id: 'arch-18', roll: 'NEX-AR-18', name: 'Morpheus Dream', email: 'morpheus.d@nexusacademy.edu', progress: '92%', status: 'Present' },
      { id: 'arch-19', roll: 'NEX-AR-19', name: 'Norman Bates', email: 'norman.b@nexusacademy.edu', progress: '78%', status: 'On Leave' },
      { id: 'arch-20', roll: 'NEX-AR-20', name: 'Optimus Prime', email: 'optimus.p@nexusacademy.edu', progress: '99%', status: 'Present' },
      { id: 'arch-21', roll: 'NEX-AR-21', name: 'Patrick Bateman', email: 'patrick.b@nexusacademy.edu', progress: '84%', status: 'Present' },
      { id: 'arch-22', roll: 'NEX-AR-22', name: 'Queen Elizabeth', email: 'queen.e@nexusacademy.edu', progress: '91%', status: 'Present' },
      { id: 'arch-23', roll: 'NEX-AR-23', name: 'Rick Sanchez', email: 'rick.s@nexusacademy.edu', progress: '100%', status: 'Present' },
      { id: 'arch-24', roll: 'NEX-AR-24', name: 'Scully Dana', email: 'dana.s@nexusacademy.edu', progress: '95%', status: 'Present' },
      { id: 'arch-25', roll: 'NEX-AR-25', name: 'Tyler Durden', email: 'tyler.d@nexusacademy.edu', progress: '86%', status: 'Present' },
      { id: 'arch-26', roll: 'NEX-AR-26', name: 'Uhtred Bebbanburg', email: 'uhtred.b@nexusacademy.edu', progress: '88%', status: 'Present' },
      { id: 'arch-27', roll: 'NEX-AR-27', name: 'Vito Scaletta', email: 'vito.s@nexusacademy.edu', progress: '85%', status: 'Present' },
      { id: 'arch-28', roll: 'NEX-AR-28', name: 'Wednesday Addams', email: 'wednesday.a@nexusacademy.edu', progress: '97%', status: 'Present' },
      { id: 'arch-29', roll: 'NEX-AR-29', name: 'Xander Harris', email: 'xander.h@nexusacademy.edu', progress: '81%', status: 'Present' },
      { id: 'arch-30', roll: 'NEX-AR-30', name: 'Yennefer Vengerberg', email: 'yennefer.v@nexusacademy.edu', progress: '96%', status: 'Present' },
      { id: 'arch-31', roll: 'NEX-AR-31', name: 'Zelda Hyrule', email: 'zelda.h@nexusacademy.edu', progress: '94%', status: 'Present' },
      { id: 'arch-32', roll: 'NEX-AR-32', name: 'Albus Dumbledore', email: 'albus.d@nexusacademy.edu', progress: '99%', status: 'Present' },
      { id: 'arch-33', roll: 'NEX-AR-33', name: 'Bilbo Baggins', email: 'bilbo.b@nexusacademy.edu', progress: '87%', status: 'Present' },
      { id: 'arch-34', roll: 'NEX-AR-34', name: 'Conan Barbarian', email: 'conan.b@nexusacademy.edu', progress: '80%', status: 'On Leave' },
      { id: 'arch-35', roll: 'NEX-AR-35', name: 'Django Freeman', email: 'django.f@nexusacademy.edu', progress: '90%', status: 'Present' },
      { id: 'arch-36', roll: 'NEX-AR-36', name: 'Elliot Alderson', email: 'elliot.a@nexusacademy.edu', progress: '98%', status: 'Present' }
    ]
  }
};

export default function FacultyDashboardModal() {
  const { activeModal, closeModal, showToast } = useApp();

  const [selectedFacultyId, setSelectedFacultyId] = useState(1); // Default to Dr. Sarah Jenkins
  const [activeTab, setActiveTab] = useState('students'); // Start directly on Students & Attendance!

  // Attendance batch & session state
  const [selectedBatchId, setSelectedBatchId] = useState('b-fs01');
  const [attendanceDate, setAttendanceDate] = useState('2026-09-23');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'Present' | 'On Leave'

  // Master attendance state per batch
  const [batchAttendance, setBatchAttendance] = useState(() => {
    const initial = {};
    Object.keys(BATCH_COHORTS).forEach(bId => {
      initial[bId] = {};
      BATCH_COHORTS[bId].students.forEach(s => {
        initial[bId][s.id] = s.status === 'Absent' ? 'On Leave' : s.status;
      });
    });
    return initial;
  });

  // Announcements state
  const [announcement, setAnnouncement] = useState('');
  const [announcementErrors, setAnnouncementErrors] = useState('');
  const [announcementsList, setAnnouncementsList] = useState([
    { id: 1, date: 'Today, 10:30 AM', title: 'Module 4 State Management Project submission window is now open', batch: 'Batch FS-01' },
    { id: 2, date: 'Yesterday, 2:15 PM', title: 'Live Q&A Session Recording Uploaded to Learning Portal', batch: 'All Batches' }
  ]);

  if (activeModal !== 'faculty-dashboard') return null;

  const currentFaculty = FACULTY.find(f => f.id === Number(selectedFacultyId)) || FACULTY[0];
  const assignedCourses = COURSES.filter(c => c.instructor.name === currentFaculty.name);
  const activeBatch = BATCH_COHORTS[selectedBatchId] || BATCH_COHORTS['b-fs01'];

  // Total students enrolled across all 4 cohorts (38 + 36 + 35 + 36 = 145)
  const totalEnrolledStudents = Object.values(BATCH_COHORTS).reduce((acc, b) => acc + b.totalEnrolled, 0);

  // Filtered students for current batch
  const currentStudentsList = activeBatch.students;
  const currentAttendanceMap = batchAttendance[selectedBatchId] || {};

  const filteredStudents = useMemo(() => {
    return currentStudentsList.filter(s => {
      const currentStatus = currentAttendanceMap[s.id] || 'Present';
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.roll.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [currentStudentsList, currentAttendanceMap, searchQuery, statusFilter]);

  // Attendance metrics for active batch
  const presentCount = currentStudentsList.filter(s => (currentAttendanceMap[s.id] || 'Present') === 'Present').length;
  const leaveCount = currentStudentsList.length - presentCount;
  const attendanceRate = ((presentCount / currentStudentsList.length) * 100).toFixed(1);

  // Toggle single student
  const toggleAttendance = (studentId, studentName) => {
    setBatchAttendance(prev => {
      const batchMap = { ...(prev[selectedBatchId] || {}) };
      const current = batchMap[studentId] || 'Present';
      const next = current === 'Present' ? 'On Leave' : 'Present';
      batchMap[studentId] = next;
      showToast(`${studentName} marked as ${next}`, 'info');
      return { ...prev, [selectedBatchId]: batchMap };
    });
  };

  // Bulk mark all present
  const handleMarkAll = (statusToSet) => {
    setBatchAttendance(prev => {
      const batchMap = { ...(prev[selectedBatchId] || {}) };
      currentStudentsList.forEach(s => {
        batchMap[s.id] = statusToSet;
      });
      showToast(`All ${currentStudentsList.length} students in ${activeBatch.code} marked as ${statusToSet}!`, 'success');
      return { ...prev, [selectedBatchId]: batchMap };
    });
  };

  const handleSaveAttendance = () => {
    showToast(`Attendance record for ${activeBatch.code} on ${attendanceDate} saved successfully! (${presentCount}/${currentStudentsList.length} Present)`, 'success');
  };

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!announcement.trim()) {
      setAnnouncementErrors('Announcement text cannot be empty');
      return;
    }
    setAnnouncementsList([
      { id: Date.now(), date: 'Just now', title: announcement.trim(), batch: activeBatch.code },
      ...announcementsList
    ]);
    setAnnouncement('');
    setAnnouncementErrors('');
    showToast('Announcement broadcasted to enrolled students!', 'success');
  };

  return (
    <div className="modal-backdrop overflow-y-auto py-6">
      <div className="modal-card w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden m-auto flex flex-col transition-all duration-300">
        
        {/* Modal Top Header (Academy Management System Bar) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white truncate">
                  Faculty & Instructor Portal
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider">
                  Academic Management System
                </span>
              </div>
              <p className="text-xs text-slate-300 truncate mt-0.5">
                Class scheduling, batch roll-call attendance, assignment grading & announcements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-auto">
            {/* Quick Instructor Switcher */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-xl">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <label htmlFor="faculty-select" className="text-[11px] text-slate-300 font-medium">Instructor:</label>
              <select
                id="faculty-select"
                value={selectedFacultyId}
                onChange={(e) => {
                  setSelectedFacultyId(Number(e.target.value));
                  showToast(`Switched workspace to ${FACULTY.find(f => f.id === Number(e.target.value))?.name}`, 'info');
                }}
                className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
              >
                {FACULTY.map(f => (
                  <option key={f.id} value={f.id} className="bg-slate-900 text-white">
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={closeModal}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800 hover:border-slate-700"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Instructor Profile & Metrics Bar */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <img
              src={currentFaculty.avatar}
              alt={currentFaculty.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-600/30 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">{currentFaculty.name}</h3>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified Faculty
                </span>
              </div>
              <p className="text-xs font-semibold text-indigo-700">
                {currentFaculty.role} • {currentFaculty.specialization}
              </p>
            </div>
          </div>

          {/* Academic Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-slate-500 font-semibold text-[11px]">Assigned Courses</p>
              <p className="text-base font-black text-indigo-600">{assignedCourses.length || 2}</p>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-slate-500 font-semibold text-[11px]">Active Batches</p>
              <p className="text-base font-black text-indigo-600">4 Cohorts</p>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-slate-500 font-semibold text-[11px]">Enrolled Students</p>
              <p className="text-base font-black text-emerald-600" title="145 Students Enrolled Across All 4 Batches">
                {totalEnrolledStudents} <span className="text-[10px] text-slate-500 font-normal">Total</span>
              </p>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              <p className="text-slate-500 font-semibold text-[11px]">Faculty Rating</p>
              <p className="text-base font-black text-amber-500 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {currentFaculty.rating || '4.95'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6 gap-2 overflow-x-auto custom-scrollbar shrink-0">
          {[
            { id: 'students', label: 'Students & Attendance', icon: Users, badge: `${activeBatch.totalEnrolled} in cohort` },
            { id: 'overview', label: 'Assigned Courses & Batches', icon: BookOpen },
            { id: 'classes', label: "Today's & Upcoming Classes", icon: Calendar },
            { id: 'assignments', label: 'Assignments & Exams', icon: FileText },
            { id: 'messages', label: 'Announcements & Notices', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'border-indigo-600 text-indigo-600 font-extrabold bg-indigo-50/50' 
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body / Tab Contents */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/50 space-y-6">
          
          {/* TAB: STUDENTS & ATTENDANCE (Batch-By-Batch Roll Call System) */}
          {activeTab === 'students' && (
            <div className="space-y-5">
              
              {/* Batch Selector & Session Header */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-600" />
                      Student Roll Call & Batch Attendance
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select batch cohort below to take roll call. Attendance is maintained per active lecture session.
                    </p>
                  </div>

                  {/* Date & Save Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <span className="font-semibold text-slate-500">Date:</span>
                      <input
                        type="date"
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                        className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={handleSaveAttendance}
                      className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Attendance Record
                    </button>
                  </div>
                </div>

                {/* Batch Cohort Selector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.values(BATCH_COHORTS).map(cohort => {
                    const isSelected = selectedBatchId === cohort.id;
                    const cStudents = cohort.students;
                    const cMap = batchAttendance[cohort.id] || {};
                    const cPresent = cStudents.filter(s => (cMap[s.id] || 'Present') === 'Present').length;
                    return (
                      <button
                        key={cohort.id}
                        type="button"
                        onClick={() => setSelectedBatchId(cohort.id)}
                        className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative ${
                          isSelected 
                            ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm' 
                            : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-extrabold ${isSelected ? 'text-indigo-700' : 'text-slate-800'}`}>
                            {cohort.code}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {cohort.totalEnrolled} Students
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium truncate">{cohort.name}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 mt-2 border-t border-slate-200/60">
                          <span>{cohort.cohort}</span>
                          <span className="font-bold text-emerald-600">{cPresent}/{cohort.totalEnrolled} Present</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Batch Summary & Quick Roll-Call Toolbar */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">{activeBatch.code}</span>
                      <span className="text-xs font-bold text-slate-900">• {activeBatch.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Schedule: <strong className="text-slate-700">{activeBatch.schedule}</strong> • Total Enrolled: <strong className="text-slate-700">{activeBatch.totalEnrolled} Students</strong>
                    </p>
                  </div>

                  {/* Attendance Stats Counter & Quick Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 font-medium">Present:</span> <strong className="text-emerald-600">{presentCount}</strong>
                      </div>
                      <div className="w-px h-3.5 bg-slate-200" />
                      <div>
                        <span className="text-slate-500 font-medium">On Leave:</span> <strong className="text-amber-500">{leaveCount}</strong>
                      </div>
                      <div className="w-px h-3.5 bg-slate-200" />
                      <div>
                        <span className="text-slate-500 font-medium">Rate:</span> <strong className="text-indigo-600">{attendanceRate}%</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMarkAll('Present')}
                        className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                        title="Mark all students in this batch as Present"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Mark All Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMarkAll('On Leave')}
                        className="py-1.5 px-3 rounded-lg bg-white hover:bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Mark all students in this batch as On Leave"
                      >
                        <UserX className="w-3.5 h-3.5" /> Mark All On Leave
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search student by name or roll..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-9 py-1.5 text-xs w-full"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    {[
                      { id: 'all', label: `All (${currentStudentsList.length})` },
                      { id: 'Present', label: `Present (${presentCount})` },
                      { id: 'On Leave', label: `On Leave (${leaveCount})` }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setStatusFilter(f.id)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                          statusFilter === f.id
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[50vh] custom-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] sticky top-0 border-b border-slate-200 z-10">
                      <tr>
                        <th className="p-3">Roll ID</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Batch Cohort</th>
                        <th className="p-3">Curriculum Progress</th>
                        <th className="p-3">Today's Status</th>
                        <th className="p-3 text-right">Attendance Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                            No students found matching your search or filter.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => {
                          const status = currentAttendanceMap[s.id] || 'Present';
                          const isPresent = status === 'Present';
                          return (
                            <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3 font-mono font-bold text-slate-500 text-[11px]">
                                {s.roll}
                              </td>
                              <td className="p-3 font-bold text-slate-900">
                                <div>{s.name}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{s.email}</div>
                              </td>
                              <td className="p-3 text-slate-600 font-medium">
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold">
                                  {activeBatch.code}
                                </span>
                              </td>
                              <td className="p-3 font-semibold text-indigo-600">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: s.progress }} />
                                  </div>
                                  <span>{s.progress}</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                  isPresent ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                  {status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => toggleAttendance(s.id, s.name)}
                                  className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                                    isPresent
                                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                      : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
                                  }`}
                                >
                                  Mark {isPresent ? 'On Leave' : 'Present'}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB: ASSIGNED COURSES & BATCHES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" /> Courses Assigned Under Your Mentorship
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignedCourses.map(c => (
                    <div key={c.id} className="p-4 rounded-xl border border-slate-200 flex items-center gap-4 hover:border-indigo-300 transition-colors">
                      <img src={c.thumbnail} alt={c.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">{c.category}</span>
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{c.title}</h5>
                        <p className="text-[11px] text-slate-500">{c.duration} • {c.level} • {c.studentsCount} Students</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" /> Active Assigned Batches & Cohorts ({Object.keys(BATCH_COHORTS).length} Batches • {totalEnrolledStudents} Total Enrolled)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(BATCH_COHORTS).map((b) => (
                    <div key={b.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{b.code}: {b.name}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">In Progress</span>
                      </div>
                      <p className="text-xs text-slate-500">Schedule: {b.schedule}</p>
                      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
                        <span>Cohort: {b.cohort}</span>
                        <span className="font-bold text-indigo-600">{b.totalEnrolled} Students Enrolled</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: TODAY'S & UPCOMING CLASSES */}
          {activeTab === 'classes' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Today's Live Class Schedule</h4>
                  <p className="text-xs text-slate-500">Launch lectures, initiate screen sharing, and monitor student attendance</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Room Ready
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">TODAY • 06:00 PM - 07:30 PM EST</span>
                    <h5 className="text-sm font-extrabold text-slate-900">Module 4: Distributed State Management & Server Synchronization</h5>
                    <p className="text-xs text-slate-600">Batch FS-01 Oct Cohort • {activeBatch.totalEnrolled} Students Registered</p>
                  </div>
                  <button
                    onClick={() => showToast('Opening Secure Live Studio Room...', 'success')}
                    className="btn-primary py-2.5 px-5 text-xs flex items-center justify-center gap-2 whitespace-nowrap shadow-md cursor-pointer"
                  >
                    <Video className="w-4 h-4" /> Start Live Class
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ASSIGNMENTS & EXAMS */}
          {activeTab === 'assignments' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-extrabold text-slate-900">Student Assignment Submissions</h4>
              <div className="space-y-3">
                {[
                  { student: 'Alexander Wright', title: 'React E-Commerce Architecture Lab', submitted: '2 Hours Ago', grade: '95/100' },
                  { student: 'Beatrix Vance', title: 'Full-Stack RESTful API Project', submitted: 'Yesterday', grade: 'Ungraded' },
                  { student: 'Cameron Diaz', title: 'Deep Neural Network Model Training', submitted: 'Yesterday', grade: '98/100' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500">Student: {item.student} • {item.submitted}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        item.grade === 'Ungraded' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.grade}
                      </span>
                      <button
                        onClick={() => showToast(`Reviewing ${item.student}'s code submission`, 'info')}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Review Code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ANNOUNCEMENTS & MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-base font-extrabold text-slate-900">Broadcast Notice to Enrolled Students</h4>
                <form onSubmit={handlePostAnnouncement} noValidate className="space-y-3">
                  <div>
                    <label className="field-label mb-1.5 block">
                      Announcement Content <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <textarea
                      rows="3"
                      value={announcement}
                      onChange={(e) => {
                        setAnnouncement(e.target.value);
                        if (announcementErrors) setAnnouncementErrors('');
                      }}
                      placeholder="Type announcement message for all enrolled students in your batches..."
                      className={`textarea-field p-3 text-xs w-full ${
                        announcementErrors ? 'border-red-500 ring-1 ring-red-400' : ''
                      }`}
                    />
                    {announcementErrors && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {announcementErrors}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Target Cohort: <strong className="text-indigo-600">{activeBatch.code} & All Batches</strong></span>
                    <button
                      type="submit"
                      className="btn-primary py-2 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Send className="w-3.5 h-3.5" /> Post Announcement
                    </button>
                  </div>
                </form>
              </div>

              {/* Feed of announcements */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Recent Portal Broadcasts</h4>
                <div className="space-y-3">
                  {announcementsList.map(a => (
                    <div key={a.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-bold text-indigo-600">{a.batch}</span>
                        <span>{a.date}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800">{a.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
