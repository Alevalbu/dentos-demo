import { CategoryDetails } from '@/types/category';
import fs from 'fs';
import path from 'path';

export interface MemberData {
  name: string;
  picture?: string;
  tokenPrice: number;
  meetings: number;
}

export interface CategoryDetailsData {
    categoryDetails: CategoryDetails;
}

/**
 * Fetches member data from a local JSON file
 * @returns Promise<MemberData[]> Array of member data
 */
export async function getMemberData(): Promise<MemberData[]> {
  try {
    // Get the path to the JSON file
    const filePath = path.join(process.cwd(), 'data', 'members.json');
    console.log('filepath', filePath);
    
    // Read the file
    const fileData = await fs.promises.readFile(filePath, 'utf8');
    
    // Parse the JSON data
    const data = JSON.parse(fileData) as MemberData[];
    
    return data;
  } catch (error) {
    console.error('Error fetching member data:', error);
    return [];
  }
}

export async function getCategoryDetails(id: string): Promise<CategoryDetailsData | null> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'category.json');
        console.log('category filepath', filePath);

        const fileData = await fs.promises.readFile(filePath, 'utf8');

        const data = JSON.parse(fileData) as CategoryDetailsData;

        return data;
    } catch(error) {
        console.error('Error fetching the member data', error);
        return null;
    }
}

/**
 * Gets summary statistics about members
 */
export async function getMemberStats() {
  const members = await getMemberData();
  
  return {
    totalMembers: members.length,
    totalMeetings: members.reduce((sum, member) => sum + member.meetings, 0),
    averageTokenPrice: members.length > 0 
      ? members.reduce((sum, member) => sum + member.tokenPrice, 0) / members.length 
      : 0,
    topPerformer: members.length > 0 
      ? members.reduce((prev, current) => 
          prev.tokenPrice > current.tokenPrice ? prev : current
        ) 
      : null
  };
}

/**
 * Interface for creating a new event
 */
interface CreateEventData {
  title: string;
  date: string;
  description?: string;
  location?: string;
  // Add other fields as needed
}

/**
 * Interface for creating a new event
 */
interface CreateEventData {
  title: string;
  date: string;
  description?: string;
  location?: string;
  // Add other fields as needed
}

/**
 * Fetches all events from the API with 3-hour cache
 * @returns Promise containing array of events
 */
export async function getEvents(): Promise<any[]> {
  try {
    const response = await fetch('http://127.0.0.1:8000/get_events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 3 hours (10800 seconds)
      next: { 
        revalidate: 10800 
      }
    });

    console.log('this is the response', response);

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.status}`);
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
}

/**
 * Creates a new event via the API
 * @param eventData The event data to create
 * @returns Promise containing the created event
 */
export async function createEvent(eventData: CreateEventData): Promise<any> {
  try {
    const response = await fetch('http://127.0.0.1:8000/create_event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Error creating event: ${response.status}`);
    }

    const createdEvent = await response.json();
    return createdEvent;
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
}