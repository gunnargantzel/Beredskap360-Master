import { WebApi } from 'dataverse-webapi';
import { dataverseConfig } from '../config/authConfig';

class DataverseService {
  private webApi: WebApi;
  private accessToken: string | null = null;

  constructor() {
    this.webApi = new WebApi(dataverseConfig.environmentUrl, this.getAccessToken);
  }

  private getAccessToken = async (): Promise<string> => {
    if (!this.accessToken) {
      throw new Error('No access token available. Please authenticate first.');
    }
    return this.accessToken;
  };

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Øvelser (Exercises)
  public async getExercises() {
    try {
      const response = await this.webApi.retrieveMultipleRecords('new_exercises', {
        select: ['new_exerciseid', 'new_name', 'new_status', 'new_startdate', 'new_enddate', 'new_description'],
        orderby: 'new_startdate desc'
      });
      return response.value;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      throw error;
    }
  }

  public async createExercise(exerciseData: any) {
    try {
      const response = await this.webApi.createRecord('new_exercises', exerciseData);
      return response;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw error;
    }
  }

  public async updateExercise(exerciseId: string, exerciseData: any) {
    try {
      const response = await this.webApi.updateRecord('new_exercises', exerciseId, exerciseData);
      return response;
    } catch (error) {
      console.error('Error updating exercise:', error);
      throw error;
    }
  }

  public async deleteExercise(exerciseId: string) {
    try {
      const response = await this.webApi.deleteRecord('new_exercises', exerciseId);
      return response;
    } catch (error) {
      console.error('Error deleting exercise:', error);
      throw error;
    }
  }

  // Hendelser (Events)
  public async getEvents() {
    try {
      const response = await this.webApi.retrieveMultipleRecords('new_events', {
        select: ['new_eventid', 'new_name', 'new_status', 'new_eventdate', 'new_description', 'new_exercise'],
        orderby: 'new_eventdate desc'
      });
      return response.value;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  public async createEvent(eventData: any) {
    try {
      const response = await this.webApi.createRecord('new_events', eventData);
      return response;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  public async updateEvent(eventId: string, eventData: any) {
    try {
      const response = await this.webApi.updateRecord('new_events', eventId, eventData);
      return response;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  public async deleteEvent(eventId: string) {
    try {
      const response = await this.webApi.deleteRecord('new_events', eventId);
      return response;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  // Deltakere (Participants)
  public async getParticipants() {
    try {
      const response = await this.webApi.retrieveMultipleRecords('new_participants', {
        select: ['new_participantid', 'new_name', 'new_email', 'new_phone', 'new_department', 'new_role'],
        orderby: 'new_name'
      });
      return response.value;
    } catch (error) {
      console.error('Error fetching participants:', error);
      throw error;
    }
  }

  public async createParticipant(participantData: any) {
    try {
      const response = await this.webApi.createRecord('new_participants', participantData);
      return response;
    } catch (error) {
      console.error('Error creating participant:', error);
      throw error;
    }
  }

  public async updateParticipant(participantId: string, participantData: any) {
    try {
      const response = await this.webApi.updateRecord('new_participants', participantId, participantData);
      return response;
    } catch (error) {
      console.error('Error updating participant:', error);
      throw error;
    }
  }

  public async deleteParticipant(participantId: string) {
    try {
      const response = await this.webApi.deleteRecord('new_participants', participantId);
      return response;
    } catch (error) {
      console.error('Error deleting participant:', error);
      throw error;
    }
  }

  // Statistikk og rapporter
  public async getExerciseStats() {
    try {
      const exercises = await this.getExercises();
      const events = await this.getEvents();
      const participants = await this.getParticipants();

      return {
        totalExercises: exercises.length,
        activeExercises: exercises.filter((ex: any) => ex.new_status === 'Active').length,
        totalEvents: events.length,
        pendingEvents: events.filter((ev: any) => ev.new_status === 'Pending').length,
        completedEvents: events.filter((ev: any) => ev.new_status === 'Completed').length,
        totalParticipants: participants.length
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
}

export const dataverseService = new DataverseService();
