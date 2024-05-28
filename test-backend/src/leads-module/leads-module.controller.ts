import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LeadsService } from './leads-module.service';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  async getLabels(
    @Req() req: Request,
    @Res() res: Response,
    @Query('query') query: string,
  ): Promise<any> {
    try {
      const deals = await this.leadsService.getAllLeadsData(query);
      res.json(deals);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
