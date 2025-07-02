import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import './add.css'

const Add = () => {
  const [cards, setCards] = useState([])
  const [showContent, setShowContent] = useState('')
  const [form, setForm] = useState({ title: '', description: '', url: '', tags: '', content: '' })

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('customCards') || '[]')
      setCards(stored)
    } catch {
      /* empty */
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('customCards', JSON.stringify(cards))
  }, [cards])

  const addCard = () => {
    const tags = form.tags.trim() ? form.tags.trim().split(/\s+/) : []
    setCards([...cards, { ...form, tags }])
    setForm({ title: '', description: '', url: '', tags: '', content: '' })
  }

  const deleteCard = (index) => {
    const next = [...cards]
    next.splice(index, 1)
    setCards(next)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">自定义卡片</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>新增卡片</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新增卡片</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <input
              className="border p-2 rounded"
              placeholder="标题"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="描述"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="链接 可选"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
            <textarea
              className="border p-2 rounded"
              rows="3"
              placeholder="内容"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="标签 用空格分隔"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="secondary">取消</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={addCard}>保存</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-card shadow rounded p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
            <p className="text-sm flex-1 whitespace-pre-line">{card.description}</p>
            {card.url && (
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm mt-2"
              >
                查看链接
              </a>
            )}
            <div className="flex gap-1 mt-2 flex-wrap">
              {card.tags &&
                card.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-muted-foreground">#{tag}</span>
                ))}
            </div>
            {card.content && (
              <Button
                variant="link"
                className="p-0 mt-2 text-sm"
                onClick={() => setShowContent(card.content)}
              >
                查看内容
              </Button>
            )}
            <Button
              variant="ghost"
              className="self-end text-red-500 mt-2"
              onClick={() => deleteCard(idx)}
            >
              删除
            </Button>
          </div>
        ))}
      </div>
      <Dialog open={!!showContent} onOpenChange={() => setShowContent('')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>内容</DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap">{showContent}</pre>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">关闭</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Add
