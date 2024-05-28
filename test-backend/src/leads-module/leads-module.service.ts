import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { format } from 'date-fns';

@Injectable()
export class LeadsService {
  private apiUrl: string;
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.accessToken = this.configService.get<string>('ACCESS_TOKEN');
  }

  public async getLeads(query: string): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/api/v4/leads`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      params: {
        with: 'contacts',
        query,
      },
    });

    return response.data;
  }

  public async getStatus(statusId: number, pipelineId: number): Promise<any> {
    const response = await axios.get(
      `${this.apiUrl}/api/v4/leads/pipelines/${pipelineId}/statuses/${statusId}`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      },
    );

    return response.data;
  }

  public async getResponsibleManager(userId: number): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/api/v4/users/${userId}`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    return response.data;
  }

  public async getContact(contactUrl: string) {
    const contactData = await axios.get(contactUrl, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    return contactData;
  }

  public async getAllLeadsData(query: string): Promise<any> {
    const leadsData = await this.getLeads(query);
    const leads = leadsData._embedded.leads;

    const result = leads.map(async (lead) => {
      const status = await this.getStatus(lead.status_id, lead.pipeline_id);
      const responsible_user = await this.getResponsibleManager(
        lead.responsible_user_id,
      );

      const contacts = lead._embedded.contacts.map(async (contact) => {
        const contactData = await this.getContact(contact._links.self.href);

        return {
          name: contactData.data.name,
        };
      });

      return {
        name: lead.name,
        price: lead.price,
        status: {
          name: status.name,
          color: status.color,
        },
        responsible_user_name: responsible_user.name,
        contacts: await Promise.all(contacts),
        created_at: format(new Date(lead.created_at), 'dd.MM.yyyy HH:mm:ss'),
      };
    });

    return await Promise.all(result);
  }
}
