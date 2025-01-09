import mysql.connector
from mysql.connector import Error

def connect_to_rds():
    print("Connecting to MySQL database")
    if True:
        print("Connecting to MySQL hello world")
        # Replace these with your RDS details
        connection = mysql.connector.connect(
            host='aiinfox.cf4ysyasm9bi.ap-south-1.rds.amazonaws.com',  # RDS Endpoint
            user='admin',  # Your MySQL Username
            password='narakanar',  # Your MySQL Password
            port=3306  # Default MySQL port, change if necessary
        )
        print(connection)
        print("Connecting to MySQL hello world")
        if connection.is_connected():
            print("Connected to MySQL server")
            
            # Creating a cursor to interact with the database
            cursor = connection.cursor()
            cursor.execute("SELECT DATABASE();")
            db_info = cursor.fetchone()
            print("You're connected to database:", db_info)

            # You can also perform database queries here
            cursor.close()
        else:
            print("MySQL connection is not open")

    # except Error as e:
    #     print("Error while connecting to MySQL:", e)
    # finally:
    #     if connection.is_connected():
    #         connection.close()
    #         print("MySQL connection is closed")

# Call the function to connect
connect_to_rds()
