import { injectable, inject } from "inversify";
import "reflect-metadata";
import { ApplicationServer } from "src/interfaces/application-server";
import fastify = require("fastify");
import { Server, IncomingMessage, ServerResponse } from "http";

@injectable()
class WebServer implements ApplicationServer {

    // Create a http server. We pass the relevant typings for our http version used.
    // By passing types we get correctly typed access to the underlying http objects in routes.
    // If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
    private server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

    public listen() {
        const opts: fastify.RouteShorthandOptions = {
            schema: {
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            pong: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }

        this.server.get('/ping', opts, (request, reply) => {
            console.log("serve") // this is the http.ServerResponse with correct typings!
            reply.code(200).send({ pong: 'it worked!' })
        })

        // Run the server!
        this.server.listen(3000, (err, address) => {
            if (err) throw err
            console.info(`server listening on ${address}`)
        })
    }
}

export { WebServer };