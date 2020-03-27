# You need to launch the script in /app/utils
#for file in ../src/protos/*;
#do
#  #python3 -m grpc_tools.protoc -I../src/protos --python_out=../src/python/ --grpc_python_out=../src/python/ ../src/protos/$(basename "$file")
#  #python3 -m grpc_tools.protoc -I../src/protos --python_out=../src/python/grpc_python_generate_code/ --grpc_python_out=../src/python/grpc_python_generate_code/ ../src/protos/$(basename "$file")
#  echo "Generate proto :" ../src/protos/$(basename "$file")
#done
python3 -m grpc_tools.protoc -I../../proto --python_out=../../usr/lib/python3/dist-packages --grpc_python_out=../../usr/lib/python3/dist-packages ../../proto/*.proto
echo "Generate proto in /usr/lib/python3/dist-packages"

