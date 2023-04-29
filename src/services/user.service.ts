/* eslint-disable @typescript-eslint/ban-ts-comment */
import User from '../database/models/user.model';
import mongoose from 'mongoose';

export default class UserService {
  async createUser(userBody: Partial<User>): Promise<User> {
    const user = await User.create(userBody);
    return user;
  }
  async getAllUsers(
    filter: Partial<User>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false
  ) {
    const user = ignorePagination
      ? await User.find(filter)
      : await User.paginate(filter, options);
    return user;
  }

  async getUserById(
    id: string,
    eagerLoad = true,
    load?: string
  ): Promise<mongoose.Document & User> {
    const data = eagerLoad
      ? await User.findById(id).populate(load)
      : User.findById(id);
    if (!data) new Error(`User with id: ${id} does not exist`);
    return data;
  }

  async getUserByRssn(
    rssn: string,
    eagerLoad = true,
    load?: string
  ): Promise<mongoose.Document & User> {
    const data = eagerLoad
      ? await User.findOne({ rssn }).populate(load)
      : User.findOne({ rssn });
    if (!data) new Error(`User with id: ${rssn} does not exist`);
    return data;
  }

  async updateUserById(id: string, updateBody: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error(`Oops!, user does not exist`);
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  }

  async deleteUserById(id: string): Promise<User> {
    const data = await User.findByIdAndDelete(id);
    return data;
  }

  async getUserByEmail(email: string): Promise<User> {
    const data = await User.findOne({ email });
    return data;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    const data = await User.findOne({ phoneNumber });
    return data;
  }

  async getUserByReferralCode(referralCode: string): Promise<User> {
    const data = await User.findOne({ referralCode });
    return data;
  }

  async getUserDetail(filter: Partial<User>) {
    const data = await User.findOne(filter);
    return data;
  }

  async searchUsers(searchQuery: string): Promise<User[]> {
    const data = await User.find({
      $or: [{ fullName: { $regex: searchQuery, $options: 'i' } }],
    });

    return data;
  }

  async saveUserDeviceInfo(data: typeof Map, actor: User) {
    const user = await User.findByIdAndUpdate(
      actor.id,
      {
        $push: {
          'settings.deviceInfo': data,
        },
      },
      { new: true }
    );
    return user;
  }
}
