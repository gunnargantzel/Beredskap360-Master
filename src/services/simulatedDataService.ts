// Simulert data service for dashboard
export interface SimulatedExercise {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'Planned';
  startDate: Date;
  endDate: Date;
  participants: number;
  location: string;
  type: 'Fire' | 'Evacuation' | 'Security' | 'Medical';
  progress: number;
}

export interface SimulatedEvent {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'Pending';
  eventDate: Date;
  description: string;
  exerciseId: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
}

export interface SimulatedParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Emergency';
  lastSeen: Date;
}

export interface SimulatedAgent {
  id: string;
  name: string;
  status: 'Running' | 'Idle' | 'Error';
  lastActivity: Date;
  tasksCompleted: number;
  currentTask?: string;
}

export interface SimulatedNotification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

class SimulatedDataService {
  private exercises: SimulatedExercise[] = [];
  private events: SimulatedEvent[] = [];
  private participants: SimulatedParticipant[] = [];
  private agents: SimulatedAgent[] = [];
  private notifications: SimulatedNotification[] = [];

  constructor() {
    this.initializeData();
    this.startSimulation();
  }

  private initializeData() {
    // Simulerte øvelser
    this.exercises = [
      {
        id: 'ex-001',
        name: 'Brannøvelse - Hovedkontor',
        status: 'Active',
        startDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 timer siden
        endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 timer frem
        participants: 45,
        location: 'Hovedkontor, 3. etasje',
        type: 'Fire',
        progress: 65
      },
      {
        id: 'ex-002',
        name: 'Evakuering - Avdeling B',
        status: 'Completed',
        startDate: new Date(Date.now() - 4 * 60 * 60 * 1000),
        endDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        participants: 32,
        location: 'Avdeling B, 1. etasje',
        type: 'Evacuation',
        progress: 100
      },
      {
        id: 'ex-003',
        name: 'Sikkerhetstrening - Team 1',
        status: 'Planned',
        startDate: new Date(Date.now() + 1 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
        participants: 28,
        location: 'Konferansesenter',
        type: 'Security',
        progress: 0
      }
    ];

    // Simulerte hendelser
    this.events = [
      {
        id: 'ev-001',
        name: 'Brannalarm utløst',
        status: 'Active',
        eventDate: new Date(Date.now() - 30 * 60 * 1000),
        description: 'Brannalarm utløst i serverrom. Evakuering pågår.',
        exerciseId: 'ex-001',
        severity: 'High',
        location: 'Serverrom, 2. etasje'
      },
      {
        id: 'ev-002',
        name: 'Evakuering fullført',
        status: 'Completed',
        eventDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: 'Alle personell evakuert fra Avdeling B.',
        exerciseId: 'ex-002',
        severity: 'Medium',
        location: 'Avdeling B'
      },
      {
        id: 'ev-003',
        name: 'Sikkerhetssjekk påkrevd',
        status: 'Pending',
        eventDate: new Date(Date.now() + 30 * 60 * 1000),
        description: 'Rutinemessig sikkerhetssjekk av alle innganger.',
        exerciseId: 'ex-003',
        severity: 'Low',
        location: 'Alle innganger'
      }
    ];

    // Simulerte deltakere
    this.participants = [
      {
        id: 'p-001',
        name: 'Lars Andersen',
        email: 'lars.andersen@company.no',
        phone: '+47 123 45 678',
        department: 'IT',
        role: 'Systemadministrator',
        status: 'Active',
        lastSeen: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: 'p-002',
        name: 'Maria Hansen',
        email: 'maria.hansen@company.no',
        phone: '+47 234 56 789',
        department: 'HR',
        role: 'HR Manager',
        status: 'Active',
        lastSeen: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: 'p-003',
        name: 'Erik Johansen',
        email: 'erik.johansen@company.no',
        phone: '+47 345 67 890',
        department: 'Finance',
        role: 'Financial Controller',
        status: 'Emergency',
        lastSeen: new Date(Date.now() - 1 * 60 * 1000)
      }
    ];

    // Simulerte agenter
    this.agents = [
      {
        id: 'agent-001',
        name: 'Sikkerhetsagent Alpha',
        status: 'Running',
        lastActivity: new Date(Date.now() - 30 * 1000),
        tasksCompleted: 15,
        currentTask: 'Overvåker evakuering'
      },
      {
        id: 'agent-002',
        name: 'Kommunikasjonsagent Beta',
        status: 'Running',
        lastActivity: new Date(Date.now() - 45 * 1000),
        tasksCompleted: 8,
        currentTask: 'Sender varsler til deltakere'
      },
      {
        id: 'agent-003',
        name: 'Rapporteringsagent Gamma',
        status: 'Idle',
        lastActivity: new Date(Date.now() - 5 * 60 * 1000),
        tasksCompleted: 3,
        currentTask: undefined
      }
    ];

    // Simulerte notifikasjoner
    this.notifications = [
      {
        id: 'notif-001',
        type: 'warning',
        title: 'Brannalarm aktivert',
        message: 'Brannalarm er utløst i serverrom. Evakuering pågår.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      },
      {
        id: 'notif-002',
        type: 'success',
        title: 'Evakuering fullført',
        message: 'Alle personell er evakuert fra Avdeling B.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true
      },
      {
        id: 'notif-003',
        type: 'info',
        title: 'Ny øvelse planlagt',
        message: 'Sikkerhetstrening for Team 1 er planlagt til i morgen.',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true
      }
    ];
  }

  private startSimulation() {
    // Simuler sanntids-oppdateringer
    setInterval(() => {
      this.updateSimulation();
    }, 5000); // Oppdater hver 5. sekund

    // Simuler nye notifikasjoner
    setInterval(() => {
      this.generateRandomNotification();
    }, 15000); // Ny notifikasjon hver 15. sekund
  }

  private updateSimulation() {
    // Oppdater agent-status
    this.agents.forEach(agent => {
      if (agent.status === 'Running') {
        agent.lastActivity = new Date();
        agent.tasksCompleted += Math.floor(Math.random() * 2);
      }
    });

    // Oppdater deltaker-status
    this.participants.forEach(participant => {
      if (participant.status === 'Active') {
        participant.lastSeen = new Date(Date.now() - Math.random() * 10 * 60 * 1000);
      }
    });

    // Oppdater øvelse-progress
    this.exercises.forEach(exercise => {
      if (exercise.status === 'Active' && exercise.progress < 100) {
        exercise.progress = Math.min(100, exercise.progress + Math.random() * 5);
      }
    });
  }

  private generateRandomNotification() {
    const notificationTypes = [
      {
        type: 'info' as const,
        title: 'Systemoppdatering',
        message: 'Sikkerhetssystemet er oppdatert med nye funksjoner.'
      },
      {
        type: 'warning' as const,
        title: 'Høy aktivitet',
        message: 'Uvanlig høy aktivitet detektert i område A.'
      },
      {
        type: 'success' as const,
        title: 'Oppgave fullført',
        message: 'Sikkerhetssjekk fullført for alle innganger.'
      }
    ];

    const randomNotif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    const newNotification: SimulatedNotification = {
      id: `notif-${Date.now()}`,
      type: randomNotif.type,
      title: randomNotif.title,
      message: randomNotif.message,
      timestamp: new Date(),
      read: false
    };

    this.notifications.unshift(newNotification);
    
    // Begrens antall notifikasjoner
    if (this.notifications.length > 20) {
      this.notifications = this.notifications.slice(0, 20);
    }
  }

  // Public methods
  public getExercises(): SimulatedExercise[] {
    return [...this.exercises];
  }

  public getEvents(): SimulatedEvent[] {
    return [...this.events];
  }

  public getParticipants(): SimulatedParticipant[] {
    return [...this.participants];
  }

  public getAgents(): SimulatedAgent[] {
    return [...this.agents];
  }

  public getNotifications(): SimulatedNotification[] {
    return [...this.notifications];
  }

  public getUnreadNotifications(): SimulatedNotification[] {
    return this.notifications.filter(n => !n.read);
  }

  public markNotificationAsRead(id: string) {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  public getStats() {
    return {
      totalExercises: this.exercises.length,
      activeExercises: this.exercises.filter(e => e.status === 'Active').length,
      totalEvents: this.events.length,
      pendingEvents: this.events.filter(e => e.status === 'Pending').length,
      completedEvents: this.events.filter(e => e.status === 'Completed').length,
      totalParticipants: this.participants.length,
      activeParticipants: this.participants.filter(p => p.status === 'Active').length,
      runningAgents: this.agents.filter(a => a.status === 'Running').length,
      unreadNotifications: this.getUnreadNotifications().length
    };
  }
}

export const simulatedDataService = new SimulatedDataService();
