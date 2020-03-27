import def_functions_pb2_grpc
import def_messages_pb2
import grpc
import random
import string

from concurrent.futures import ThreadPoolExecutor


class WakeyServer(def_functions_pb2_grpc.WakeyServerServicer):

    def PredictToServer(self, request, context):

        rdm = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(12)])
        with open("../img/image_{}.jpg".format(rdm), "wb") as img:
            img.write(request.image)



        return def_messages_pb2.Result(is_closed=True)


def serve():
    """Launch the automate_grpc server. It listens on the port configure in the config file.
    """
    print("start server new")
    server = grpc.server(ThreadPoolExecutor(max_workers=10))
    def_functions_pb2_grpc.add_WakeyServerServicer_to_server(WakeyServer(), server)
    server.add_insecure_port('[::]:{port}'.format(port=50051))
    server.start()
    server.wait_for_termination()
    print("end server")
