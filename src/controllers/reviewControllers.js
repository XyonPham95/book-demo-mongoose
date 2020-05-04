exports.createReview = async (req, res) => {
  const { content } = req.body;

  try {
    const review = await Review.create({
      content: content,
      user: req.user._id,
      book: req.body._id,
    });
    res.status(200).json({ status: "ok", data: review });
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
};

exports.readReviews = async function (req, res) {
  try {
    // const reviews = await Review.find({ book: req.book._id })
    //   .populate("user", "_id name") // first way
    //   .populate({
    //     path: "book",
    //     select: "-createAt -updateAt -__v",
    //   }); // second way

    const book = await Book.findById(req.params.bookID).populate({
      path: "reviews",
      selection: "-createdAt -updatedAt -__v",
    });

    return res.status(200).json({
      status: "ok",
      data: book,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
