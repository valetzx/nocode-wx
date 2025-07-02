import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import '../pages/Add.css';

const defaultForm = {
  title: '',
  description: '',
  url: '',
  tags: '',
  content: '',
};

const Add = () => {
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('customCards');
      if (stored) {
        setCards(JSON.parse(stored));
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('customCards', JSON.stringify(cards));
  }, [cards]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = () => {
    const newCard = {
      id: Date.now(),
      title: form.title || '无标题',
      description: form.description,
      url: form.url,
      content: form.content,
      tags: form.tags.trim().split(/\s+/).filter(Boolean),
    };
    setCards([...cards, newCard]);
    setForm(defaultForm);
    setShowForm(false);
  };

  return (
    <div className="p-4 space-y-4">
      <Button onClick={() => setShowForm(!showForm)}>新增卡片</Button>
      {showForm && (
        <div className="space-y-2 max-w-xl">
          <Input
            name="title"
            placeholder="标题"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            name="description"
            placeholder="描述"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            name="url"
            placeholder="链接 可选"
            value={form.url}
            onChange={handleChange}
          />
          <Textarea
            name="content"
            placeholder="内容 可选"
            value={form.content}
            onChange={handleChange}
          />
          <Input
            name="tags"
            placeholder="标签 用空格分隔"
            value={form.tags}
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <Button onClick={handleAdd}>保存</Button>
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              取消
            </Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card key={card.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              {card.description && (
                <CardDescription>{card.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              {card.content && (
                <pre className="whitespace-pre-wrap text-sm">{card.content}</pre>
              )}
              {card.url && (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary underline"
                >
                  查看链接
                </a>
              )}
            </CardContent>
            <CardFooter className="flex gap-1 flex-wrap">
              {card.tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-500">#{tag}</span>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Add;
