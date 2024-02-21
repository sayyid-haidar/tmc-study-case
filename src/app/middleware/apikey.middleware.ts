import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers.authorization;
    const validApiKey = this.configService.getOrThrow('API_KEY');

    if (!apiKey || apiKey !== validApiKey) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  }
}
