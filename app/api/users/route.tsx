import { UserValueState } from "@/app/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const url = process.env.USERS_URL as RequestInfo | URL;

  let updatedUrl = url;

  if (id) {
    updatedUrl = url + `/${id}`;
  }

  const res = await fetch(updatedUrl);
  let users = await res.json();
  let usersList: UserValueState[] = [];

  if (id) {
    const { id, name, username, email, phone, website } = users;
    const avatar = `https://avatars.dicebear.com/v2/avataaars/{{${username}}}.svg?options[mood][]=happy`;

    let userSolo: UserValueState = {
      id,
      name,
      username,
      email,
      phone,
      website,
      avatar,
      favorite: false,
    };
    return NextResponse.json(userSolo);
  } else {
    users.map(async (users: UserValueState) => {
      const { id, name, username, email, phone, website } = users;
      const avatar = `https://avatars.dicebear.com/v2/avataaars/{{${username}}}.svg?options[mood][]=happy`;

      let user = {
        id,
        name,
        username,
        email,
        phone,
        website,
        avatar,
        favorite: false,
      };

      usersList.push(user);
    });
    return NextResponse.json(usersList);
  }
}

export async function DELETE(request: Request) {
  const url = process.env.USERS_URL as RequestInfo | URL;
  const res = await fetch(url);
  const users = await res.json();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return NextResponse.json("Deleting not Allowed on API");
}
