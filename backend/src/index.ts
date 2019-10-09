import { Container } from 'inversify';
import { ApplicationServer } from './interfaces/application-server';
import { WebServer } from './app/server';

const myContainer = new Container();
myContainer.bind<ApplicationServer>(WebServer).toSelf();
myContainer.get<ApplicationServer>(WebServer).listen();
