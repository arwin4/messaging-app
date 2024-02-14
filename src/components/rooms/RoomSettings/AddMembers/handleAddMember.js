import addMemberToRoom from '@utils/fetch/addMemberToRoom';
import convertToGroupRoom from '@utils/fetch/convertToGroupRoom';

export default async function handleAddMember(userId, room) {
  if (!room.isGroup) {
    await convertToGroupRoom(room._id);
    // TODO: handle error
  }
  // TODO: handle error
  await addMemberToRoom(room._id, userId);
}
