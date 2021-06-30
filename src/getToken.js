const endPoint = 'https://prod-in.100ms.live/hmsapi/testch.app.100ms.live/';

export default async function getToken(room_id) {
  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
      user_id: '5fc62c5872909272bf9995e1', // User ID assigned by you (different from 100ms' assigned id)
      role: 'host', //host, teacher, guest, student
      type: 'app',
      room_id,
    }),
  });

  const { token } = await response.json();

  return token;
}