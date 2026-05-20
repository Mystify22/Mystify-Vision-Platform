import sys

with open('src/components/sections/PhoneSimulator/FeedScreen.jsx', 'r') as f:
    lines = f.readlines()

# Find the AnimatePresence blocks for comments and share.
# They start around line 332 and end around line 471.
# Let's search dynamically.
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "<AnimatePresence>" in line and "showComments" in lines[i+1]:
        start_idx = i
    if "</AnimatePresence>" in line and "showSharePopup" in lines[i-30:i+1][-30]: # Rough check
        pass

# Actually, let's just use exact strings.
with open('src/components/sections/PhoneSimulator/FeedScreen.jsx', 'r') as f:
    content = f.read()

comments_start = content.find("        <AnimatePresence>\n          {showComments && (")
share_end = content.find("          )}\n        </AnimatePresence>\n\n      </motion.div>\n    );\n  }")
share_end_idx = share_end + len("          )}\n        </AnimatePresence>")

modals_content = content[comments_start:share_end_idx]

# Now, insert modals_content at the end of the Feed view.
feed_end = content.find("      </div>\n    </motion.div>\n  );\n};\nexport default FeedScreen;")

new_content = content[:feed_end] + "\n" + modals_content + "\n" + content[feed_end:]

with open('src/components/sections/PhoneSimulator/FeedScreen.jsx', 'w') as f:
    f.write(new_content)

print("Updated FeedScreen.jsx successfully.")
