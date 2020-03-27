import def_messages_pb2
import def_functions_pb2_grpc
import grpc
import sys

with open("papillon.jpg", "rb") as bin_img:
    f = bin_img.read()
    # list_byte = bytearray(f)

param = def_messages_pb2.UploadImageRequest(image=f)

channel = grpc.insecure_channel('localhost:50051')

stub = def_functions_pb2_grpc.WakeyServerStub(channel)
try:
    message = stub.PredictToServer(param)
except grpc.RpcError as e:
    print(e.code())
    print(e.details())
    sys.exit()

print(message)
