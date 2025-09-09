// Digital Twin Service for reise-overvåking
export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  phone: string;
  email: string;
  emergencyContact: string;
  lastSeen: Date;
  status: 'Safe' | 'Warning' | 'Danger' | 'Unknown';
}

export interface Location {
  id: string;
  name: string;
  country: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timezone: string;
  localTime: Date;
}

export interface TravelInfo {
  employeeId: string;
  currentLocation: Location;
  destination: Location;
  travelStart: Date;
  travelEnd: Date;
  purpose: string;
  accommodation: string;
  flightInfo: {
    flightNumber: string;
    airline: string;
    departure: Date;
    arrival: Date;
  };
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  lastUpdated: Date;
}

export interface TrafficData {
  location: string;
  status: 'Clear' | 'Moderate' | 'Heavy' | 'Severe';
  delay: number; // minutes
  incidents: number;
  lastUpdated: Date;
}

export interface CriticalEvent {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  radius: number; // km
  startTime: Date;
  endTime?: Date;
  category: 'Natural Disaster' | 'Political' | 'Health' | 'Security' | 'Transport';
}

export interface DigitalTwin {
  employee: Employee;
  travelInfo: TravelInfo;
  weather: WeatherData;
  traffic: TrafficData;
  nearbyEvents: CriticalEvent[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  lastUpdate: Date;
}

class DigitalTwinService {
  private digitalTwins: DigitalTwin[] = [];
  private locations: Location[] = [];
  private criticalEvents: CriticalEvent[] = [];

  constructor() {
    this.initializeData();
    this.startSimulation();
  }

  private initializeData() {
    // Initialiser lokasjoner i Asia
    this.locations = [
      {
        id: 'tokyo',
        name: 'Tokyo',
        country: 'Japan',
        city: 'Tokyo',
        coordinates: { lat: 35.6762, lng: 139.6503 },
        timezone: 'Asia/Tokyo',
        localTime: new Date()
      },
      {
        id: 'singapore',
        name: 'Singapore',
        country: 'Singapore',
        city: 'Singapore',
        coordinates: { lat: 1.3521, lng: 103.8198 },
        timezone: 'Asia/Singapore',
        localTime: new Date()
      },
      {
        id: 'bangkok',
        name: 'Bangkok',
        country: 'Thailand',
        city: 'Bangkok',
        coordinates: { lat: 13.7563, lng: 100.5018 },
        timezone: 'Asia/Bangkok',
        localTime: new Date()
      },
      {
        id: 'hongkong',
        name: 'Hong Kong',
        country: 'Hong Kong',
        city: 'Hong Kong',
        coordinates: { lat: 22.3193, lng: 114.1694 },
        timezone: 'Asia/Hong_Kong',
        localTime: new Date()
      },
      {
        id: 'seoul',
        name: 'Seoul',
        country: 'South Korea',
        city: 'Seoul',
        coordinates: { lat: 37.5665, lng: 126.9780 },
        timezone: 'Asia/Seoul',
        localTime: new Date()
      }
    ];

    // Initialiser kritiske hendelser
    this.criticalEvents = [
      {
        id: 'event-001',
        title: 'Tyfon nærmer seg Filippinene',
        description: 'Tyfon med vindstyrke 120 km/h forventes å treffe Manila om 24 timer.',
        severity: 'High',
        location: 'Manila, Philippines',
        radius: 200,
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        category: 'Natural Disaster'
      },
      {
        id: 'event-002',
        title: 'Demonstrasjoner i Bangkok',
        description: 'Politisk uro og demonstrasjoner i sentrum av Bangkok.',
        severity: 'Medium',
        location: 'Bangkok, Thailand',
        radius: 10,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        category: 'Political'
      },
      {
        id: 'event-003',
        title: 'Lufttrafikk forsinkelser',
        description: 'Høy aktivitet forårsaker forsinkelser på Narita lufthavn.',
        severity: 'Low',
        location: 'Tokyo, Japan',
        radius: 50,
        startTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        category: 'Transport'
      }
    ];

    // Initialiser digitale tvillinger
    this.digitalTwins = [
      {
        employee: {
          id: 'emp-001',
          name: 'Anna Larsen',
          department: 'Sales',
          role: 'Regional Manager',
          phone: '+47 123 45 678',
          email: 'anna.larsen@company.no',
          emergencyContact: '+47 987 65 432',
          lastSeen: new Date(Date.now() - 5 * 60 * 1000),
          status: 'Safe'
        },
        travelInfo: {
          employeeId: 'emp-001',
          currentLocation: this.locations[0], // Tokyo
          destination: this.locations[1], // Singapore
          travelStart: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          travelEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          purpose: 'Kundemøter og markedsoppfølging',
          accommodation: 'Marriott Tokyo',
          flightInfo: {
            flightNumber: 'SK123',
            airline: 'SAS',
            departure: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            arrival: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000)
          }
        },
        weather: {
          location: 'Tokyo',
          temperature: 22,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          lastUpdated: new Date()
        },
        traffic: {
          location: 'Tokyo',
          status: 'Moderate',
          delay: 15,
          incidents: 2,
          lastUpdated: new Date()
        },
        nearbyEvents: [this.criticalEvents[2]],
        riskLevel: 'Low',
        lastUpdate: new Date()
      },
      {
        employee: {
          id: 'emp-002',
          name: 'Erik Johansen',
          department: 'Engineering',
          role: 'Senior Developer',
          phone: '+47 234 56 789',
          email: 'erik.johansen@company.no',
          emergencyContact: '+47 876 54 321',
          lastSeen: new Date(Date.now() - 15 * 60 * 1000),
          status: 'Warning'
        },
        travelInfo: {
          employeeId: 'emp-002',
          currentLocation: this.locations[2], // Bangkok
          destination: this.locations[3], // Hong Kong
          travelStart: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          travelEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          purpose: 'Teknisk samarbeid og workshops',
          accommodation: 'Grand Hyatt Bangkok',
          flightInfo: {
            flightNumber: 'TG456',
            airline: 'Thai Airways',
            departure: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            arrival: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000)
          }
        },
        weather: {
          location: 'Bangkok',
          temperature: 32,
          condition: 'Thunderstorm',
          humidity: 85,
          windSpeed: 25,
          visibility: 5,
          lastUpdated: new Date()
        },
        traffic: {
          location: 'Bangkok',
          status: 'Heavy',
          delay: 45,
          incidents: 5,
          lastUpdated: new Date()
        },
        nearbyEvents: [this.criticalEvents[1]],
        riskLevel: 'Medium',
        lastUpdate: new Date()
      },
      {
        employee: {
          id: 'emp-003',
          name: 'Maria Chen',
          department: 'Marketing',
          role: 'Marketing Director',
          phone: '+47 345 67 890',
          email: 'maria.chen@company.no',
          emergencyContact: '+47 765 43 210',
          lastSeen: new Date(Date.now() - 2 * 60 * 1000),
          status: 'Safe'
        },
        travelInfo: {
          employeeId: 'emp-003',
          currentLocation: this.locations[1], // Singapore
          destination: this.locations[4], // Seoul
          travelStart: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          travelEnd: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          purpose: 'Markedsanalyse og partner-møter',
          accommodation: 'Marina Bay Sands',
          flightInfo: {
            flightNumber: 'SQ789',
            airline: 'Singapore Airlines',
            departure: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            arrival: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000)
          }
        },
        weather: {
          location: 'Singapore',
          temperature: 28,
          condition: 'Sunny',
          humidity: 70,
          windSpeed: 8,
          visibility: 15,
          lastUpdated: new Date()
        },
        traffic: {
          location: 'Singapore',
          status: 'Clear',
          delay: 5,
          incidents: 0,
          lastUpdated: new Date()
        },
        nearbyEvents: [],
        riskLevel: 'Low',
        lastUpdate: new Date()
      }
    ];
  }

  private startSimulation() {
    // Oppdater lokaltid hver 30 sekunder
    setInterval(() => {
      this.updateLocalTimes();
    }, 30000);

    // Oppdater værdata hver 2 minutter
    setInterval(() => {
      this.updateWeatherData();
    }, 120000);

    // Oppdater trafikkdata hver minutt
    setInterval(() => {
      this.updateTrafficData();
    }, 60000);

    // Oppdater ansatt-status hver 10 sekunder
    setInterval(() => {
      this.updateEmployeeStatus();
    }, 10000);

    // Generer nye kritiske hendelser
    setInterval(() => {
      this.generateRandomEvent();
    }, 300000); // Hver 5. minutt
  }

  private updateLocalTimes() {
    this.locations.forEach(location => {
      const now = new Date();
      location.localTime = new Date(now.toLocaleString("en-US", { timeZone: location.timezone }));
    });
  }

  private updateWeatherData() {
    this.digitalTwins.forEach(twin => {
      // Simuler vær-endringer
      const weather = twin.weather;
      weather.temperature += (Math.random() - 0.5) * 2;
      weather.humidity += (Math.random() - 0.5) * 5;
      weather.windSpeed += (Math.random() - 0.5) * 3;
      weather.lastUpdated = new Date();

      // Begrens verdier
      weather.temperature = Math.max(15, Math.min(40, weather.temperature));
      weather.humidity = Math.max(30, Math.min(95, weather.humidity));
      weather.windSpeed = Math.max(0, Math.min(50, weather.windSpeed));
    });
  }

  private updateTrafficData() {
    this.digitalTwins.forEach(twin => {
      const traffic = twin.traffic;
      traffic.delay += (Math.random() - 0.5) * 10;
      traffic.incidents += Math.floor((Math.random() - 0.7) * 2);
      traffic.lastUpdated = new Date();

      // Begrens verdier
      traffic.delay = Math.max(0, Math.min(120, traffic.delay));
      traffic.incidents = Math.max(0, traffic.incidents);

      // Oppdater status basert på delay
      if (traffic.delay < 10) traffic.status = 'Clear';
      else if (traffic.delay < 30) traffic.status = 'Moderate';
      else if (traffic.delay < 60) traffic.status = 'Heavy';
      else traffic.status = 'Severe';
    });
  }

  private updateEmployeeStatus() {
    this.digitalTwins.forEach(twin => {
      const employee = twin.employee;
      employee.lastSeen = new Date(Date.now() - Math.random() * 30 * 60 * 1000);

      // Oppdater status basert på risiko
      if (twin.riskLevel === 'Critical') employee.status = 'Danger';
      else if (twin.riskLevel === 'High') employee.status = 'Warning';
      else if (twin.riskLevel === 'Medium') employee.status = 'Warning';
      else employee.status = 'Safe';

      twin.lastUpdate = new Date();
    });
  }

  private generateRandomEvent() {
    const eventTypes = [
      {
        title: 'Jordskjelv i regionen',
        description: 'Jordskjelv med styrke 5.2 registrert i nærheten.',
        severity: 'High' as const,
        category: 'Natural Disaster' as const
      },
      {
        title: 'Lufttrafikk forsinkelser',
        description: 'Høy aktivitet forårsaker forsinkelser på lufthavnen.',
        severity: 'Medium' as const,
        category: 'Transport' as const
      },
      {
        title: 'Sikkerhetsadvarsel',
        description: 'Økt sikkerhetsovervåking i området.',
        severity: 'Low' as const,
        category: 'Security' as const
      }
    ];

    const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomLocation = this.locations[Math.floor(Math.random() * this.locations.length)];

    const newEvent: CriticalEvent = {
      id: `event-${Date.now()}`,
      title: randomEvent.title,
      description: randomEvent.description,
      severity: randomEvent.severity,
      location: randomLocation.name,
      radius: Math.random() * 100 + 10,
      startTime: new Date(),
      category: randomEvent.category
    };

    this.criticalEvents.unshift(newEvent);

    // Begrens antall hendelser
    if (this.criticalEvents.length > 20) {
      this.criticalEvents = this.criticalEvents.slice(0, 20);
    }

    // Oppdater risiko for ansatte i nærheten
    this.updateRiskLevels();
  }

  private updateRiskLevels() {
    this.digitalTwins.forEach(twin => {
      const nearbyEvents = this.criticalEvents.filter(event => 
        event.location === twin.travelInfo.currentLocation.name
      );

      twin.nearbyEvents = nearbyEvents;

      if (nearbyEvents.some(e => e.severity === 'Critical')) {
        twin.riskLevel = 'Critical';
      } else if (nearbyEvents.some(e => e.severity === 'High')) {
        twin.riskLevel = 'High';
      } else if (nearbyEvents.some(e => e.severity === 'Medium')) {
        twin.riskLevel = 'Medium';
      } else {
        twin.riskLevel = 'Low';
      }
    });
  }

  // Public methods
  public getDigitalTwins(): DigitalTwin[] {
    return [...this.digitalTwins];
  }

  public getCriticalEvents(): CriticalEvent[] {
    return [...this.criticalEvents];
  }

  public getLocations(): Location[] {
    return [...this.locations];
  }

  public getStats() {
    const totalEmployees = this.digitalTwins.length;
    const safeEmployees = this.digitalTwins.filter(t => t.employee.status === 'Safe').length;
    const warningEmployees = this.digitalTwins.filter(t => t.employee.status === 'Warning').length;
    const dangerEmployees = this.digitalTwins.filter(t => t.employee.status === 'Danger').length;
    const totalEvents = this.criticalEvents.length;
    const activeEvents = this.criticalEvents.filter(e => !e.endTime).length;

    return {
      totalEmployees,
      safeEmployees,
      warningEmployees,
      dangerEmployees,
      totalEvents,
      activeEvents
    };
  }
}

export const digitalTwinService = new DigitalTwinService();
