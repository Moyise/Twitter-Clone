import { model, Schema, Model, Document, Types } from "mongoose";

interface INotification extends Document {
  userTo: object;
  userFrom: object;
  notificationType: string;
  opened: boolean;
  entityId: any;
  createdAt?: any;
  updatedAt?: any;
  insertNotification(): void;
}

const notificationSchema: Schema<INotification> = new Schema(
  {
    userTo: { type: Types.ObjectId, ref: "User" },
    userFrom: { type: Types.ObjectId, ref: "User" },
    notificationType: String,
    opened: { type: Boolean, default: false },
    entityId: Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

notificationSchema.statics.insertNotification = async (
  userTo: string,
  userFrom: string,
  notificationType: string,
  entityId: any
) => {
  const data = {
    userTo,
    userFrom,
    notificationType,
    entityId,
  };

  await Notification.deleteOne(data).catch((error) => console.log(error));
  return Notification.create(data).catch((error) => console.log(error));
};

const Notification: Model<INotification> = model("Notification", notificationSchema);

export default Notification;
