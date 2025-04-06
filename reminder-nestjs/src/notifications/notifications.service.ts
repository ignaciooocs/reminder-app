import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class NotificationsService {
  private client: Client;
  private readonly logger = new Logger(NotificationsService.name);

  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: 'localhost',  // Usa la IP o nombre del host de tu contenedor si es necesario
      database: 'reminder',
      password: 'postgres',
      port: 5433,
    });

    // Conectar al cliente
    this.client.connect()
      .then(() => this.logger.log('Conexión a PostgreSQL establecida correctamente'))
      .catch((error) => this.logger.error('Error al conectar con PostgreSQL', error));

    // Escuchar las notificaciones
    this.client.query('LISTEN reminder_ready');

    // Evento de notificación
    this.client.on('notification', (msg) => {
      this.logger.log('Notificación recibida:', msg.payload);
    });

    this.client.on('error', (error) => {
      this.logger.error('Error de PostgreSQL', error);
    });
  }
}
