def nqueens(n):
   col = set()
   posDiag = set() #r+c
   negDiag = set() #r-c

   res = []
   board = [["."] * n for i in range(n)]

   def backTrack(r):
      if r == n:
         copy = ["".join(row) for row in board]
         res.append(copy)
         return

      for c in range(n):
         if c in col or (r+c) in posDiag or (r-c) in negDiag:
            continue

         col.add(c)
         posDiag.add(r+c)
         negDiag.add(r-c)
         board[r][c] = "Q"

         backTrack(r+1)

         col.remove(c)
         posDiag.remove(r+c)
         negDiag.remove(r-c)
         board[r][c] = "."
   backTrack(0)
   return res

sol = nqueens(4)
print(sol)
