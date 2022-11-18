import React, { useEffect, useState } from "react";
import {Avatar, Button, List } from "antd";
import axios from "axios";
import { Content } from "antd/lib/layout/layout";

type GuestBookItem = {
    key: number;
    title: string,
    content: string,
    username: string,
  }
  

  const GuestBook = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<GuestBookItem[]>([]);

    const fetchGuestbookItems = async () => {
        const {data} = await axios.get(
            "http://localhost:3001/guestbook/items");
        //console.log("results", results);
        const results = data;
        const items: GuestBookItem[] = [];
        for (let i=0; i<results.length; i++){
            items.push({
                key: results[i].id,
                title: results[i].title,
                content: results[i].Content,
                username: results[i].name
            })
        }      
        setData(items);
    }
    return (
    <>
      <List
        loading={loading}
      style={{ background: "#fff" }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
              <div style={{
                display:'flex',
                flexDirection: "column",
                alignItems: 'center', 
                justifyContent: "center"}}>
              <Avatar src="https://joeschmoe.io/api/v1/random"/>
              <>{item.username}</>
              </div>
              }
              title={item.title}
              description={item.content}
            />
            
          </List.Item>
        )}
     />
     <Button
      onClick={async () => {
        setLoading(true);
        fetchGuestbookItems();
        setLoading(false);
     }}
     >
        수동 새로고침
    </Button>
    </>
    );
  };

  export default GuestBook;