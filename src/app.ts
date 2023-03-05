import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import Database from '@/utils/init.mongodb';
import Controller from '@/utils/interfaces/controller.interface';
import errorMiddleware from '@/middleware/error.middleware';
import noRouteMiddleware from './middleware/no-route.middleware';

class App {
    public express: Application;
    public port: Number;
    private databaseStr: string;

    constructor(controllers: Controller[], port: Number, databaseStr: string) {
        this.express = express();
        this.port = port;
        this.databaseStr = databaseStr;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(helmet());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controllers: Controller) => {
            this.express.use('/api', controllers.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(noRouteMiddleware);
        this.express.use(errorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        Database.getInstance(this.databaseStr);
    }

    public listen(): void {
        this.express.listen(this.port, () =>
            console.log(`Appliance listening on port ${this.port}`)
        );
    }
}

export default App;
