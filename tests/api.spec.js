import { test, expect } from '@playwright/test';

test.describe.serial('API-тесты для Restful-booker', () => {
  const baseURL = 'https://restful-booker.herokuapp.com';
  let bookingId = null;
  let authToken = null;
  const postData = {
    firstname: 'Valery',
    lastname: 'Semenova',
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-18',
      checkout: '2026-08-20'
    },
    additionalneeds: 'Breakfast'
  };
  const authData = {
    username: 'admin',
    password: 'password123',
  };


  test('Создание бронирования', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: postData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    bookingId = responseBody.bookingid;
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody.booking).toMatchObject(postData);
  });

  test('Получение информации о бронировании', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toMatchObject(postData);
  });

  test('Авторизация и получение токена', async ({ request }) => {
    const response = await request.post(`${baseURL}/auth`, {
      data: authData,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    authToken = responseBody.token;
    expect(authToken).toBeDefined();
  });

  test('Обновление бронирования', async ({ request }) => {
    expect(authToken).not.toBeNull();
    expect(bookingId).not.toBeNull();

    const updatedData = {
      firstname: 'Kim',
      lastname: 'Semenova',
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-08-18',
        checkout: '2026-08-20'
      },
      additionalneeds: 'Dinner'
    };

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: updatedData, // ✅ данные передаются через data
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${authToken}`
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log('Обновленные данные:', responseBody);
    expect(responseBody).toMatchObject(updatedData);
  });
  test('Удаление бронирования', async ({ request }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      data: authData,
      headers: {
        'Cookie': `token=${authToken}`

      }
    });
    
    expect(response.status()).toBe(201);
    const responseText = await response.text();
    console.log('Ответ сервера:', responseText);
    expect(responseText).toBe('Created');
  });
    test('Проверка после удаления', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(404);
    const responseText = await response.text();
    console.log('Ответ сервера:', responseText);
    expect(responseText).toBe('Not Found');
  });
});